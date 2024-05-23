import { Component, OnInit, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BlobServiceClient } from '@azure/storage-blob';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, AfterViewInit {
  articles: any[] = [];
  colors: string[] = ['#F14F21', '#7EB900', '#00A3EE', '#FEB800', '#727272'];
  filteredArticles: any[] = [];
  startDate: string;
  endDate: string;
  selectedCategory: string = 'all';
  categories: string[] = [];
  filteredCategories: string[] = [];
  loading: boolean = false;

  private apiUrl = 'https://fa-microsoftai.azurewebsites.net/api';

  constructor(private http: HttpClient) {
    this.endDate = new Date().toISOString();
    this.startDate = this.getPreviousMonday().toISOString();
  }

  ngOnInit() {
    this.loadArticles();
  }

  ngAfterViewInit() {
    this.addPopoverListeners();
  }

  private async initializeAzureStorage(): Promise<BlobServiceClient> {
    const connectionString = 'your-azure-storage-connection-string';
    const blobServiceClient =
      BlobServiceClient.fromConnectionString(connectionString);
    return blobServiceClient;
  }

  async scrapeArticles() {
    try {
      const articlesData = await this.http
        .get<any[]>(`${this.apiUrl}/get_articles`)
        .toPromise();
      this.articles = articlesData || [];

      const articlePromises = this.articles.map((article) =>
        this.http
          .post<any>(`${this.apiUrl}/gen_summaries`, {
            title: article.title,
            content: article.content,
          })
          .toPromise()
          .then((summaryResponse) => {
            article.slug = summaryResponse.slug;
            article.summary = summaryResponse.summary;
            return article;
          })
      );

      this.articles = await Promise.all(articlePromises);

      const categoryResponse = await this.http
        .post<any>(`${this.apiUrl}/gen_categories`, {
          articles: this.articles,
        })
        .toPromise();

      this.articles.forEach((article, index) => {
        article.category = categoryResponse.categories[index].category;
      });

      this.categories = Array.from(
        new Set(this.articles.map((article) => article.category))
      );
    } catch (error) {
      console.error('Error scraping articles:', error);
    }
  }

  async loadArticles() {
    this.loading = true;

    try {
      const blobServiceClient = await this.initializeAzureStorage();
      const containerClient = blobServiceClient.getContainerClient('scrapes');

      const blobs = containerClient.listBlobsFlat({ prefix: 'articles' });
      let latestBlob;
      for await (const blob of blobs) {
        if (
          !latestBlob ||
          blob.properties.lastModified > latestBlob.properties.lastModified
        ) {
          latestBlob = blob;
        }
      }

      if (latestBlob) {
        const blobClient = containerClient.getBlobClient(latestBlob.name);
        const downloadResponse = await blobClient.download();
        const articlesData = downloadResponse.blobBody
          ? await (await downloadResponse.blobBody).text()
          : '';
        this.articles = articlesData ? JSON.parse(articlesData) : [];
      } else {
        await this.scrapeArticles();
      }
    } catch (error) {
      console.error('Error loading articles:', error);
    }

    this.filterArticles();
    this.loading = false;
  }

  private async saveScrapedData() {
    try {
      const blobServiceClient = await this.initializeAzureStorage();
      const containerClient = blobServiceClient.getContainerClient('scrapes');
      const blobName = `articles-${new Date().toISOString()}.json`;
      const blockBlobClient = containerClient.getBlockBlobClient(blobName);
      const articlesData = JSON.stringify(this.articles);
      await blockBlobClient.upload(articlesData, articlesData.length);
      console.log('Scraped data saved to Azure Storage.');
    } catch (error) {
      console.error('Error saving scraped data:', error);
    }
  }

  async refreshData() {
    this.loading = true;
    await this.scrapeArticles();
    await this.saveScrapedData();
    this.filterArticles();
    this.loading = false;
  }

  addPopoverListeners() {
    const popovers = document.querySelectorAll('ion-popover');

    popovers.forEach((popover) => {
      let popoverViewport: Element | null;

      const addMouseListener = () => {
        popoverViewport = popover.querySelector('.popover-viewport');
        if (popoverViewport) {
          popoverViewport.addEventListener('mouseleave', handleMouseLeave);
        }
      };

      const removeMouseListener = () => {
        if (popoverViewport) {
          popoverViewport.removeEventListener('mouseleave', handleMouseLeave);
          popoverViewport = null;
        }
      };

      const handleMouseLeave = () => {
        if (popover) {
          popover.dismiss();
        }
      };

      popover.addEventListener('ionPopoverWillPresent', () => {
        addMouseListener();
      });
      popover.addEventListener('ionPopoverWillDismiss', () => {
        removeMouseListener();
      });
    });
  }

  getIconForCategory(category: string): string {
    switch (category) {
      case 'Product Updates':
        return 'rocket';
      case 'Company News':
        return 'business';
      case 'Educational Resources':
        return 'school';
      case 'Success Story':
        return 'star';
      case 'Industry Insights':
        return 'eye';
      default:
        return 'information-circle';
    }
  }

  getColorForCategory(category: string): string {
    const categories = Array.from(
      new Set(this.articles.map((article) => article.category))
    );
    const index = categories.indexOf(category);
    return this.colors[index % this.colors.length];
  }

  filterArticles() {
    const startTimestamp = new Date(this.startDate).setHours(0, 0, 0, 0);
    const endTimestamp = new Date(this.endDate).setHours(23, 59, 59, 999);

    this.filteredArticles = this.articles.filter((article) => {
      const articleDate = new Date(Date.parse(article.date));
      return (
        articleDate >= new Date(startTimestamp) &&
        articleDate <= new Date(endTimestamp)
      );
    });

    this.filterCategories();
  }

  filterCategories() {
    const articleCategories = this.filteredArticles.map(
      (article) => article.category
    );
    this.filteredCategories = Array.from(new Set(articleCategories));
  }

  isArticleTransparent(article: any): boolean {
    return !(
      this.selectedCategory === 'all' ||
      article.category === this.selectedCategory
    );
  }

  onDateChange() {
    this.filterArticles();
  }

  onCategoryChange() {
    this.filterArticles();
  }

  getPreviousMonday(): Date {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const diff = today.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
    return new Date(today.setDate(diff));
  }
}
