import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  articles: any[] = [];
  colors: string[] = ['#F14F21', '#7EB900', '#00A3EE', '#FEB800', '#727272'];

  constructor() {}

  ngOnInit() {
    const jsonString = `[
      {"title": "Global governance: Goals and lessons for AI", "link": "https://blogs.microsoft.com/on-the-issues/2024/05/17/global-governance-goals-and-lessons-for-ai/", "date": "May 17, 2024", "slug": "AI Governance: Goals and Lessons", "summary": "The article introduces 'Global Governance: Goals and Lessons for AI,' a compilation of expert insights and historical case studies from international institutions like the International Civil Aviation Organization and the Financial Stability Board. It aims to inform and guide the global governance of AI through three key takeaways: industry standards, domestic regulation, and international governance, emphasizing the importance of regulatory interoperability, inclusive progress, and effective risk management.", "category": "Industry Insights"},
      {"title": "Introducing GPT-4o: OpenAI’s new model in preview on Azure", "link": "https://azure.microsoft.com/en-us/blog/introducing-gpt-4o-openais-new-flagship-multimodal-model-now-in-preview-on-azure/%20", "date": "May 13, 2024", "slug": "GPT-4o: OpenAI’s Azure Preview", "summary": "Microsoft has announced the launch of GPT-4o, OpenAI's new multimodal AI model available in preview on Azure, featuring advanced text, vision, and audio capabilities. GPT-4o aims to provide more engaging user experiences and is currently accessible through the Azure OpenAI Service.", "category": "Product Updates"},
      {"title": "Microsoft announces investment in France to accelerate AI", "link": "https://news.microsoft.com/fr-fr/2024/05/13/microsoft-announces-the-largest-investment-to-date-in-france-to-accelerate-the-adoption-of-ai-skilling-and-innovation/", "date": "May 13, 2024", "slug": "Microsoft Invests in France's AI", "summary": "Microsoft is making its largest investment in France, committing €4 billion to enhance cloud and AI infrastructure, train 1 million people, and support 2,500 AI startups by 2027, aiming to boost the nation's digital competitiveness and economy. This initiative aligns with France's National Strategy for AI and includes creating new datacenters, AI training programs, and partnerships to foster sustainable and inclusive growth in the AI sector.", "category": "Company News"},
      {"title": "AI brings new life to flexible work with Microsoft Places", "link": "https://www.microsoft.com/en-us/microsoft-365/blog/2024/05/13/ai-brings-new-life-to-flexible-work-with-microsoft-places/", "date": "May 13, 2024", "slug": "AI Enhances Flexible Work with Places", "summary": "Microsoft Places is a new application that leverages AI to enhance coordination and connection in flexible work environments by streamlining in-office scheduling and facilitating better engagement among coworkers. It integrates with tools like Outlook and Microsoft Teams and will soon include Microsoft Copilot to optimize workplace effectiveness and provide intelligent suggestions for workspace management.", "category": "Product Updates"},
      {"title": "10 more AI terms everyone should know", "link": "https://news.microsoft.com/source/features/ai/10-more-ai-terms-everyone-should-know/", "date": "May 13, 2024", "slug": "10 Essential AI Terms", "summary": "This article introduces and explains ten additional essential terms and concepts related to artificial intelligence that are important for both novices and professionals to understand in order to better grasp the evolving field.", "category": "Educational Resources"},
      {"title": "Leading AI Transformation: Moody’s drives pragmatic AI innovation to help employees and customers around the world", "link": "https://news.microsoft.com/source/2024/05/09/leading-ai-transformation-moodys-drives-pragmatic-ai-innovation-to-help-employees-and-customers-around-the-world/", "date": "May 9, 2024", "slug": "Moody’s Global AI Transformation", "summary": "Moody’s Corporation, leveraging its long-standing expertise in data-driven decision-making, is partnering with Microsoft to develop innovative AI-powered solutions that enhance employee productivity and provide customers with advanced search and analytical tools to better understand and manage risk.", "category": "Success Story"},
      {"title": "ServiceNow and Microsoft expand strategic alliance using AI", "link": "https://news.microsoft.com/2024/05/08/servicenow-and-microsoft-expand-strategic-alliance-combining-generative-ai-capabilities-to-enhance-choice-and-flexibility/", "date": "May 8, 2024", "slug": "ServiceNow, Microsoft Enhance Alliance with AI", "summary": "ServiceNow and Microsoft have announced an expanded strategic alliance to integrate their generative AI assistants—ServiceNow's Now Assist and Microsoft's Copilot—combining their capabilities for a more seamless and productive enterprise experience. This integration aims to enhance employee productivity by allowing the AI assistants to interact intuitively within Microsoft 365, enabling smoother execution of tasks and better support for everyday work activities.", "category": "Company News"},
      {"title": "Microsoft announces $3.3B investment in Wisconsin to spur AI innovation", "link": "https://news.microsoft.com/2024/05/08/microsoft-announces-3-3-billion-investment-in-wisconsin-to-spur-artificial-intelligence-innovation-and-economic-growth/", "date": "May 8, 2024", "slug": "Microsoft's $3.3B Wisconsin AI Investment", "summary": "Microsoft announced a $3.3 billion investment in Wisconsin aimed at fostering AI innovation through the development of cloud computing infrastructure, the establishment of a manufacturing-focused AI co-innovation lab, and an AI skilling initiative for over 100,000 residents. President Joe Biden will join Microsoft executives in Mount Pleasant for the announcement, highlighting the company's commitment to advancing the local economy, workforce, and community through technology and education partnerships.", "category": "Company News"},
      {"title": "3 ways Microsoft Azure AI Studio helps accelerate the AI development journey", "link": "https://azure.microsoft.com/en-us/blog/3-ways-microsoft-azure-ai-studio-helps-accelerate-the-ai-development-journey/", "date": "May 7, 2024", "slug": "Accelerate AI with Azure AI Studio", "summary": "The article outlines how Microsoft Azure AI Studio aids in accelerating AI development through three main features: offering flexible development options via both a user-friendly interface and code, providing a robust model catalog for selecting and benchmarking foundation models, and streamlining development cycles with tools like prompt flow for real-time monitoring and optimization. These capabilities aim to democratize AI development and simplify the creation of custom AI applications and copilots.", "category": "Product Updates"},
      {"title": "Bringing generative AI to Azure network security with new Microsoft Copilot integrations", "link": "https://azure.microsoft.com/en-us/blog/bringing-generative-ai-to-azure-network-security-with-new-microsoft-copilot-integrations/", "date": "May 7, 2024", "slug": "Generative AI Enhances Azure Security", "summary": "Microsoft has announced the integration of Azure Web Application Firewall (WAF) and Azure Firewall with its Copilot for Security, bringing generative AI capabilities to network security on Azure. These integrations aim to automate threat detection and analysis, enabling security analysts to manage and investigate elaborate data sets more efficiently and effectively, ultimately elevating the overall security posture of organizations.", "category": "Product Updates"},
      {"title": "The 2024 Work Trend Index: AI at work is here — now comes the hard part", "link": "https://news.microsoft.com/annual-wti-2024", "date": "May 7, 2024", "slug": "AI at Work: Next Steps", "summary": "The 2024 Work Trend Index discusses the integration of AI in the workplace, highlighting both the opportunities and challenges that come with its implementation. The article delves into how businesses need to navigate the complexities of AI adoption to fully harness its potential.", "category": "Industry Insights"},
      {"title": "7 takeaways from a year of building generative AI responsibly and at scale", "link": "https://news.microsoft.com/source/features/ai/7-takeaways-from-a-year-of-building-generative-ai-responsibly-and-at-scale/", "date": "May 6, 2024", "slug": "Lessons from a Year of Scalable AI", "summary": "The article discusses key learnings from Microsoft's efforts over the past year in responsibly scaling generative AI, highlighting the importance of embedding responsible AI practices at all stages of product development, rapidly evolving based on customer feedback, centralizing processes to ensure consistency, and equipping users with tools and information to mitigate risks and understand AI limitations. It also addresses the necessity of transparency, anticipates misuse, and emphasizes the ongoing need for innovation and user engagement.", "category": "Industry Insights"}
    ]`;

    this.articles = JSON.parse(jsonString);
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
}
