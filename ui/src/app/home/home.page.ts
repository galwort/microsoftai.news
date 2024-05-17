import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  articles: any[] = [];

  constructor() {}

  ngOnInit() {
    const jsonString = `[
      {"title": "Introducing GPT-4o: OpenAI’s new model in preview on Azure", "link": "https://azure.microsoft.com/en-us/blog/introducing-gpt-4o-openais-new-flagship-multimodal-model-now-in-preview-on-azure/%20", "date": "May 13, 2024", "summary": "Microsoft has announced the preview launch of GPT-4o on Azure AI, a new model from OpenAI that combines text, vision, and audio capabilities to enhance generative and conversational AI experiences. It is currently available through Azure OpenAI Service and showcases advanced features that include handling complex queries efficiently, with potential applications in customer service, analytics, and content creation.", "category": "Product Updates"},
      {"title": "Microsoft announces investment in France to accelerate AI", "link": "https://news.microsoft.com/fr-fr/2024/05/13/microsoft-announces-the-largest-investment-to-date-in-france-to-accelerate-the-adoption-of-ai-skilling-and-innovation/", "date": "May 13, 2024", "summary": "Microsoft announced a €4 billion investment in France to boost cloud and AI infrastructure, AI education, and support for French technology. The multi-year plan includes training 1 million individuals in AI skills, enhancing support for 2,500 AI startups by 2027, and aligns with France's National Strategy for AI, underlining a commitment to sustainable growth and digital innovation within the country.", "category": "Company News"},
      {"title": "AI brings new life to flexible work with Microsoft Places", "link": "https://www.microsoft.com/en-us/microsoft-365/blog/2024/05/13/ai-brings-new-life-to-flexible-work-with-microsoft-places/", "date": "May 13, 2024", "summary": "Microsoft is introducing Microsoft Places, an app geared towards reinventing flexible work by using AI to help coordinate office schedules and connect coworkers easily. This innovation aims to address the tension between workplace flexibility and maintaining team connections, improving coordination among flexible teams, and optimizing the use of office spaces. Microsoft Places will integrate with apps like Outlook and Microsoft Teams for seamless coordination within everyday workflows. Moreover, it will be enhanced by Microsoft Copilot in the second half of 2024 to provide intelligent suggestions on the best days to work in the office based on various factors. This app is part of Microsoft's broader commitment to building a smarter workplace and is included with Microsoft Teams Premium licensing.", "category": "Product Updates"},
      {"title": "10 more AI terms everyone should know", "link": "https://news.microsoft.com/source/features/ai/10-more-ai-terms-everyone-should-know/", "date": "May 13, 2024", "summary": "The article likely provides a list and explanation of 10 additional artificial intelligence (AI) related terms that are important for a general audience to understand as AI technology becomes increasingly prevalent in various sectors. It aims to educate readers on the vocabulary necessary to navigate discussions and news about AI advancements and applications.", "category": "Educational Content"},
      {"title": "Leading AI Transformation: Moody’s drives pragmatic AI innovation to help employees and customers around the world", "link": "https://news.microsoft.com/source/2024/05/09/leading-ai-transformation-moodys-drives-pragmatic-ai-innovation-to-help-employees-and-customers-around-the-world/", "date": "May 9, 2024", "summary": "Moody's Corporation, in partnership with Microsoft, is leveraging generative AI to develop innovative tools aimed at increasing productivity for its employees and delivering new insights for customers in the financial services industry. These AI-powered solutions reflect Moody's commitment to embracing cutting-edge technologies to enhance decision-making and risk management.", "category": "Success Story"},
      {"title": "ServiceNow and Microsoft expand strategic alliance using AI", "link": "https://news.microsoft.com/2024/05/08/servicenow-and-microsoft-expand-strategic-alliance-combining-generative-ai-capabilities-to-enhance-choice-and-flexibility/", "date": "May 8, 2024", "summary": "ServiceNow and Microsoft have expanded their strategic alliance by integrating ServiceNow's Now Assist with Microsoft Copilot to provide users with a unified generative AI-driven enterprise experience. This collaboration aims to enhance employee productivity by reducing context switching and streamlining the execution of work tasks, with general availability slated for Fall 2024.", "category": "Company News"},
      {"title": "Microsoft announces $3.3B investment in Wisconsin to spur AI innovation", "link": "https://news.microsoft.com/2024/05/08/microsoft-announces-3-3-billion-investment-in-wisconsin-to-spur-artificial-intelligence-innovation-and-economic-growth/", "date": "May 8, 2024", "summary": "Microsoft has announced a substantial $3.3 billion investment in Wisconsin, aimed at bolstering AI and cloud computing infrastructure, which includes creating the first manufacturing-focused AI co-innovation lab in the US, and launching an AI skilling initiative for over 100,000 residents. President Joe Biden is expected to join the announcement, reflecting the investment's significance in driving economic growth, innovation, and job creation in Southeast Wisconsin, supported by partnerships with local educational and community organizations.", "category": "Company News"},
      {"title": "3 ways Microsoft Azure AI Studio helps accelerate the AI development journey", "link": "https://azure.microsoft.com/en-us/blog/3-ways-microsoft-azure-ai-studio-helps-accelerate-the-ai-development-journey/", "date": "May 7, 2024", "summary": "Microsoft Azure AI Studio is a generative AI platform aimed at simplifying AI development for developers by offering a unified UI and code-first approach, access to an extensive model catalog, and tools for efficient development cycles. Its features enable teams to choose their preferred development method, identify the best AI models for their needs, and streamline development cycles with tools like prompt flow, catering to diverse skill levels and accelerating the time to market for AI applications.", "category": "Product Updates"},
      {"title": "Bringing generative AI to Azure network security with new Microsoft Copilot integrations", "link": "https://azure.microsoft.com/en-us/blog/bringing-generative-ai-to-azure-network-security-with-new-microsoft-copilot-integrations/", "date": "May 7, 2024", "summary": "Microsoft has announced the integration of Azure Web Application Firewall (WAF) and Azure Firewall into the generative AI-powered Microsoft Copilot for Security. This integration aims to boost the efficiency of security analysts by leveraging AI to provide tailored insights and actionable summaries, improving their ability to respond to cyber threats more quickly and accurately.", "category": "Product Updates"},
      {"title": "The 2024 Work Trend Index: AI at work is here — now comes the hard part", "link": "https://news.microsoft.com/annual-wti-2024", "date": "May 7, 2024", "summary": "The 2024 Work Trend Index report highlights the growing integration of Artificial Intelligence in the workplace, but emphasizes that the real challenge lies in effectively adapting to and managing the ethical, practical, and workforce-related implications of AI adoption in the professional environment.", "category": "Research Insights"},
      {"title": "7 takeaways from a year of building generative AI responsibly and at scale", "link": "https://news.microsoft.com/source/features/ai/7-takeaways-from-a-year-of-building-generative-ai-responsibly-and-at-scale/", "date": "May 6, 2024", "summary": "Microsoft's experiences with generative AI over the past year highlight the importance of responsible AI as a foundational element, the need for rapid evolution and customer feedback integration, centralized systems for scalability, the importance of transparency about AI-generated content, empowering customers with responsible AI tools, anticipating and preventing system misuse, and informing users about the limits of AI. Steps include embedding metadata to identify AI-generated content, providing training modules for employees, offering customer tools like Azure AI Content Safety, and releasing transparency notes for AI services. The company emphasizes the importance of listening to user feedback to continuously improve AI technologies. Images for the story were created using Microsoft Designer, an AI-powered graphic design application.", "category": "Thought Leadership"},
      {"title": "Providing further transparency on our responsible AI efforts", "link": "https://blogs.microsoft.com/on-the-issues/2024/05/01/responsible-ai-transparency-report-2024/", "date": "May 1, 2024", "summary": "The article announces the release of the inaugural edition of an annual Responsible AI Transparency Report, underscoring the company's commitment to sharing its evolving responsible AI practices with the public. The report reflects the company's learnings, goals, and strides in developing AI technologies based on values like transparency, accountability, fairness, inclusiveness, reliability, safety, and privacy. It invites stakeholders to engage in dialogue around responsible AI practices and utilize the report to further the momentum in the field.", "category": "Company News"}
    ]`;

    this.articles = JSON.parse(jsonString);
  }
}
