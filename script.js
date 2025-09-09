// Simple Markdown Parser
class SimpleMarkdownParser {
    static parse(markdown) {
        let html = markdown;
        
        // Headers
        html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
        html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
        html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');
        
        // Bold
        html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        
        // Italic
        html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
        
        // Code
        html = html.replace(/`(.*?)`/g, '<code>$1</code>');
        
        // Links
        html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
        
        // Line breaks and paragraphs
        html = html.replace(/\n\n/g, '</p><p>');
        html = html.replace(/\n/g, '<br>');
        
        // Wrap in paragraph tags
        html = '<p>' + html + '</p>';
        
        // Clean up empty paragraphs
        html = html.replace(/<p><\/p>/g, '');
        html = html.replace(/<p><h/g, '<h');
        html = html.replace(/<\/h([1-6])><\/p>/g, '</h$1>');
        
        // Lists
        html = html.replace(/^\- (.*$)/gim, '<li>$1</li>');
        html = html.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');
        
        return html;
    }
}

// Website Navigation and Markdown Rendering System
class WebsiteManager {
    constructor() {
        this.currentRoute = 'home';
        this.content = {};
        this.isLoading = false;
        
        this.initializeElements();
        this.bindEvents();
        this.initializeRouting();
        this.loadInitialContent();
    }
    
    initializeElements() {
        // Navigation elements
        this.menuToggle = document.getElementById('menuToggle');
        this.sidebar = document.getElementById('sidebar');
        this.navMenu = document.getElementById('navMenu');
        
        // Content elements
        this.mainContent = document.getElementById('mainContent');
        this.pageTitle = document.getElementById('pageTitle');
        this.breadcrumb = document.getElementById('breadcrumb');
        this.contentBody = document.getElementById('contentBody');
        
        // Right sidebar elements
        this.rightSidebar = document.getElementById('rightSidebar');
        this.tableOfContents = document.getElementById('tableOfContents');
        this.lastUpdated = document.getElementById('lastUpdated');
        this.readingTime = document.getElementById('readingTime');
        
        // Search elements
        this.searchInput = document.getElementById('searchInput');
        this.searchBtn = document.getElementById('searchBtn');
        
        // Theme toggle
        this.themeToggle = document.getElementById('themeToggle');
        
        // Loading overlay
        this.loadingOverlay = document.getElementById('loadingOverlay');
    }
    
    bindEvents() {
        // Mobile menu toggle
        this.menuToggle?.addEventListener('click', () => {
            this.toggleSidebar();
        });
        
        // Navigation clicks
        this.navMenu?.addEventListener('click', (e) => {
            this.handleNavigation(e);
        });
        
        // Search functionality
        this.searchBtn?.addEventListener('click', () => {
            this.performSearch();
        });
        
        this.searchInput?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.performSearch();
            }
        });
        
        // Theme toggle
        this.themeToggle?.addEventListener('click', () => {
            this.toggleTheme();
        });
        
        // Handle browser back/forward
        window.addEventListener('popstate', (e) => {
            this.handleRouteChange(e.state?.route || 'home', false);
        });
        
        // Close sidebar when clicking outside on mobile
        document.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                if (!this.sidebar?.contains(e.target) && !this.menuToggle?.contains(e.target)) {
                    this.closeSidebar();
                }
            }
        });
        
        // Handle window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                this.sidebar?.classList.remove('show');
            }
        });
    }
    
    initializeRouting() {
        // Define content for different routes
        this.content = {
            home: {
                title: '欢迎来到活在肥宣',
                breadcrumb: ['首页'],
                content: `# 欢迎来到活在肥宣

这是一个现代化的网站平台，致力于为用户提供丰富的内容和优质的服务体验。

## 网站特色

### 🎯 直观导航
- 清晰的侧边栏导航结构
- 支持多级菜单展开和收起
- 响应式设计，适配各种设备

### 📝 Markdown支持
- 原生Markdown文档渲染
- 丰富的格式化选项
- 代码高亮显示

### 🔍 智能搜索
- 快速内容搜索功能
- 实时搜索建议
- 精确匹配结果

### 🌙 深色主题
- 护眼的深色界面
- 现代化的设计风格
- 优秀的可读性

## 开始探索

使用左侧导航菜单开始浏览我们的内容：

- **活在肥宣** - 了解我们的故事和文化
- **黄页** - 查找相关服务和联系信息
- **服务** - 探索我们提供的各类服务
- **联系我们** - 与我们取得联系

欢迎您的到来，希望您有愉快的浏览体验！`
            },
            
            introduction: {
                title: '简介',
                breadcrumb: ['首页', '活在肥宣', '简介'],
                content: `# 活在肥宣 - 简介

## 关于我们

活在肥宣是一个充满活力的社区平台，致力于连接人们，分享知识，创造价值。

## 我们的使命

### 🎯 连接社区
我们相信每个人都有独特的价值和故事。通过我们的平台，人们可以：
- 分享经验和知识
- 建立有意义的连接
- 共同成长和学习

### 💡 创新服务
我们不断探索新的服务模式：
- 提供高质量的内容
- 开发便民服务工具
- 构建互助合作网络

## 发展历程

### 2024年初
- 平台概念形成
- 技术架构设计
- 核心团队组建

### 现在
- 网站正式上线
- 基础功能完善
- 用户社区建设

## 核心价值观

1. **开放包容** - 欢迎不同背景的人们参与
2. **诚信透明** - 保持真实和诚实的交流
3. **互助共赢** - 通过合作创造更大价值
4. **持续创新** - 不断改进和优化服务

加入我们，一起创造美好的数字生活体验！`
            },
            
            history: {
                title: '历史',
                breadcrumb: ['首页', '活在肥宣', '历史'],
                content: `# 活在肥宣发展史

## 项目起源

### 初期构想 (2023年底)
项目的想法源于对现有社区平台的思考：
- 如何让信息更好地流动？
- 如何建立真正有价值的连接？
- 如何让技术更好地服务于人？

## 关键里程碑

### 📅 2024年1月 - 项目启动
- 确定项目方向和目标
- 技术选型和架构设计
- 核心功能规划

### 📅 2024年2月 - 技术开发
- 前端界面设计与开发
- 后端系统架构搭建
- 数据库结构设计

### 📅 2024年3月 - 测试上线
- 功能测试和优化
- 用户体验改进
- 正式发布上线

## 技术演进

### 前端技术栈
- **HTML5/CSS3** - 现代化的页面结构和样式
- **JavaScript ES6+** - 动态交互和路由管理
- **Markdown渲染** - 丰富的内容展示格式
- **响应式设计** - 多设备适配

### 设计理念
- **用户优先** - 以用户体验为核心
- **简洁高效** - 追求简洁而功能强大
- **可扩展性** - 为未来发展预留空间

## 团队成长

从最初的想法到现在的实现，团队在技术和理念上都有了显著成长：
- 深化了对用户需求的理解
- 提升了技术实现能力
- 积累了项目管理经验

## 未来展望

我们将继续：
- 🚀 扩展功能特性
- 🎨 优化用户界面
- 🔧 提升系统性能
- 🤝 建设用户社区

历史是过去的记录，更是未来的指引。我们将继续前行，为用户创造更大价值！`
            },
            
            culture: {
                title: '文化',
                breadcrumb: ['首页', '活在肥宣', '文化'],
                content: `# 活在肥宣的文化理念

## 核心文化

### 🌟 开放协作
我们相信开放的力量：
- **知识共享** - 鼓励分享经验和见解
- **透明沟通** - 保持坦诚的交流方式
- **集体智慧** - 通过协作产生更好的解决方案

### 💪 追求卓越
我们始终追求更好：
- **品质优先** - 注重每一个细节的完善
- **持续改进** - 不断优化和升级
- **创新驱动** - 探索新的可能性

### 🤝 以人为本
人是我们最重要的财富：
- **尊重个体** - 重视每个人的独特价值
- **关注成长** - 支持个人和团队发展
- **平衡生活** - 追求工作与生活的和谐

## 社区准则

### 互相尊重
- 尊重不同的观点和背景
- 使用礼貌和建设性的语言
- 避免攻击性和歧视性言论

### 诚实守信
- 提供准确和真实的信息
- 遵守承诺和约定
- 承认错误并及时纠正

### 积极贡献
- 主动分享有价值的内容
- 帮助他人解决问题
- 参与社区建设和改进

## 团队文化

### 学习型组织
我们是一个持续学习的团队：
- 鼓励尝试新技术和方法
- 从失败中学习和成长
- 分享知识和最佳实践

### 扁平化管理
- 减少层级，提高效率
- 鼓励直接沟通和反馈
- 让每个人都有发言权

### 结果导向
- 关注目标和成果
- 重视效率和质量
- 数据驱动决策

## 价值观实践

### 日常工作中
- 以用户价值为出发点
- 追求简洁优雅的解决方案
- 重视代码质量和文档

### 产品设计中
- 注重用户体验
- 保持界面简洁直观
- 确保功能稳定可靠

### 社区运营中
- 营造友好的氛围
- 提供及时的支持
- 收集和响应用户反馈

我们相信，文化是组织的灵魂。通过共同的价值观和理念，我们能够创造出更有意义和影响力的产品和服务。

加入我们，一起践行这些美好的文化理念！`
            },
            
            yellowpages: {
                title: '黄页',
                breadcrumb: ['首页', '黄页'],
                content: `# 黄页服务

欢迎来到活在肥宣黄页服务！这里为您提供便民信息查询和服务推荐。

## 🏢 商业服务

### 餐饮美食
- **川菜馆** - 正宗川味，麻辣鲜香
- **咖啡厅** - 精品咖啡，舒适环境
- **面包店** - 新鲜烘焙，健康美味

### 生活服务
- **快递服务** - 快速配送，安全可靠
- **清洁服务** - 专业清洁，贴心服务
- **维修服务** - 技术过硬，价格公道

## 🛠️ 专业服务

### 技术服务
- **网站开发** - 现代化网站建设
- **软件定制** - 个性化解决方案
- **系统维护** - 专业技术支持

### 咨询服务
- **商业咨询** - 战略规划指导
- **法律咨询** - 专业法律建议
- **财务咨询** - 理财规划服务

## 📞 联系方式

### 服务热线
- **客服电话**: 400-888-8888
- **服务时间**: 9:00-18:00 (工作日)
- **邮箱**: service@example.com

### 在线服务
- **在线客服**: 24小时在线支持
- **服务预约**: 提前预约，优先服务
- **反馈建议**: 持续改进，用户至上

## 🎯 服务特色

### 质量保证
- 严格筛选服务商
- 定期质量评估
- 用户满意度追踪

### 便民优惠
- 新用户专享优惠
- 会员积分制度
- 节日特别活动

### 快速响应
- 快速匹配服务商
- 实时进度跟踪
- 及时问题解决

如需添加您的服务信息，请联系我们的客服团队！`
            },
            
            'services-business': {
                title: '商业服务',
                breadcrumb: ['首页', '服务', '商业服务'],
                content: `# 商业服务

我们为企业和个人提供全方位的商业服务支持。

## 💼 企业服务

### 商业策略咨询
- **市场分析** - 深入的市场调研和竞争分析
- **战略规划** - 制定可执行的商业战略
- **运营优化** - 提升业务效率和盈利能力

### 品牌建设
- **品牌设计** - 专业的视觉识别系统
- **营销策划** - 创新的营销方案设计
- **数字营销** - 线上推广和社交媒体运营

## 🎯 创业支持

### 初创企业服务
- **商业计划书** - 专业的商业计划撰写
- **融资对接** - 投资人资源介绍
- **法务支持** - 公司注册和合规指导

### 成长期企业
- **团队建设** - 人力资源管理咨询
- **流程优化** - 业务流程标准化
- **技术升级** - 数字化转型支持

## 📊 数据服务

### 商业分析
- **数据挖掘** - 深度数据分析和洞察
- **报告定制** - 专业的分析报告
- **决策支持** - 数据驱动的决策建议

### 市场研究
- **行业调研** - 详细的行业发展趋势
- **用户研究** - 目标用户行为分析
- **竞品分析** - 竞争对手策略研究

## 🤝 合作模式

### 项目制服务
- 明确的项目目标和交付成果
- 专业的项目管理团队
- 灵活的合作周期

### 长期合作
- 持续的战略咨询支持
- 优惠的服务价格
- 专属的服务团队

联系我们，开始您的商业成功之旅！`
            },
            
            'services-tech': {
                title: '技术服务',
                breadcrumb: ['首页', '服务', '技术服务'],
                content: `# 技术服务

我们提供专业的技术开发和咨询服务，助力您的数字化转型。

## 💻 软件开发

### Web应用开发
- **前端开发** - 现代化的用户界面设计
- **后端开发** - 稳定可靠的服务器架构
- **全栈开发** - 端到端的完整解决方案

### 移动应用开发
- **iOS应用** - 原生iOS应用开发
- **Android应用** - 高性能Android应用
- **跨平台应用** - 一套代码，多平台运行

## 🔧 技术咨询

### 架构设计
- **系统架构** - 可扩展的系统设计
- **微服务架构** - 模块化的服务拆分
- **云原生架构** - 现代化的云端部署

### 性能优化
- **系统调优** - 提升系统运行效率
- **数据库优化** - 查询性能优化
- **缓存策略** - 合理的缓存设计

## 🛡️ 安全服务

### 信息安全
- **安全评估** - 全面的安全风险评估
- **漏洞扫描** - 定期的安全漏洞检查
- **安全加固** - 系统安全防护措施

### 数据保护
- **数据加密** - 敏感数据加密存储
- **备份策略** - 可靠的数据备份方案
- **灾难恢复** - 业务连续性保障

## ☁️ 云服务

### 云迁移
- **迁移评估** - 云迁移可行性分析
- **迁移策略** - 最优的迁移路径设计
- **迁移实施** - 专业的迁移执行团队

### 云运维
- **监控告警** - 7x24小时系统监控
- **自动化运维** - DevOps最佳实践
- **成本优化** - 云资源成本控制

## 🎯 技术特色

### 前沿技术
- 人工智能和机器学习
- 区块链技术应用
- 物联网解决方案

### 质量保证
- 严格的代码审查
- 完善的测试流程
- 详细的技术文档

让技术为您的业务赋能，立即咨询我们的技术专家！`
            },
            
            'services-consulting': {
                title: '咨询服务',
                breadcrumb: ['首页', '服务', '咨询服务'],
                content: `# 咨询服务

我们的专业顾问团队为您提供全方位的咨询服务，助力您做出明智的决策。

## 💡 战略咨询

### 商业战略
- **市场进入策略** - 新市场拓展规划
- **产品策略** - 产品组合优化建议
- **竞争策略** - 竞争优势构建方案

### 数字化转型
- **转型评估** - 数字化成熟度评估
- **转型路线图** - 分阶段实施计划
- **变革管理** - 组织变革支持

## 📈 管理咨询

### 组织优化
- **组织架构设计** - 高效的组织结构
- **流程再造** - 业务流程优化
- **绩效管理** - 科学的考核体系

### 人力资源
- **人才战略** - 人才发展规划
- **培训体系** - 员工能力提升
- **激励机制** - 有效的激励方案

## 💰 财务咨询

### 财务管理
- **财务规划** - 资金使用优化
- **成本控制** - 成本结构分析
- **风险管理** - 财务风险防控

### 投资咨询
- **投资评估** - 项目投资可行性
- **融资策略** - 最优融资方案
- **并购咨询** - 并购交易支持

## 🎯 行业专长

### 科技行业
- 深度理解技术趋势
- 丰富的行业经验
- 前瞻性的战略建议

### 传统行业
- 数字化转型专长
- 运营效率提升
- 商业模式创新

## 🤝 服务流程

### 1. 需求分析
- 深入了解客户需求
- 现状诊断和分析
- 制定咨询方案

### 2. 方案实施
- 专业团队执行
- 定期进度汇报
- 及时调整优化

### 3. 成果交付
- 详细的咨询报告
- 可执行的行动计划
- 后续跟踪支持

## 🏆 我们的优势

### 专业团队
- 资深的行业专家
- 丰富的项目经验
- 持续的知识更新

### 定制化服务
- 针对性的解决方案
- 灵活的服务模式
- 个性化的建议

预约咨询，开启您的成功之路！`
            },
            
            contact: {
                title: '联系我们',
                breadcrumb: ['首页', '联系我们'],
                content: `# 联系我们

我们很高兴为您提供帮助！无论您有任何问题或建议，都欢迎与我们取得联系。

## 📞 联系方式

### 客服热线
- **服务电话**: 400-888-8888
- **服务时间**: 周一至周五 9:00-18:00
- **紧急联系**: 185-xxxx-xxxx (24小时)

### 电子邮箱
- **一般咨询**: info@example.com
- **技术支持**: support@example.com
- **商务合作**: business@example.com

## 🏢 公司地址

### 总部地址
**活在肥宣科技有限公司**

地址：北京市朝阳区xxx路xxx号xxx大厦x层  
邮编：100000  
传真：010-xxxxxxxx

### 营业时间
- **周一至周五**: 9:00 - 18:00
- **周六**: 10:00 - 16:00
- **周日及节假日**: 休息

## 💬 在线服务

### 即时沟通
- **在线客服**: 网站右下角聊天窗口
- **微信客服**: 扫描二维码添加
- **QQ咨询**: 12345678

### 社交媒体
- **微博**: @活在肥宣
- **微信公众号**: 活在肥宣
- **知乎**: 活在肥宣官方

## 📝 意见反馈

### 反馈渠道
我们重视每一位用户的意见和建议：
- 网站在线反馈表单
- 邮件发送至 feedback@example.com
- 客服热线直接反馈

### 处理流程
1. **收集反馈** - 24小时内确认收到
2. **分析处理** - 3个工作日内分析
3. **回复用户** - 5个工作日内回复
4. **持续改进** - 定期优化产品服务

## 🤝 商务合作

### 合作类型
- **技术合作** - 技术交流与共同开发
- **内容合作** - 优质内容共享
- **渠道合作** - 市场推广合作
- **投资合作** - 资本合作机会

### 联系方式
- **合作邮箱**: partnership@example.com
- **商务经理**: 张经理 138-xxxx-xxxx
- **合作热线**: 010-xxxxxxxx

## 📍 如何找到我们

### 公共交通
- **地铁**: 1号线xxx站 A出口，步行5分钟
- **公交**: 123路、456路xxx站下车
- **停车**: 大厦地下停车场，前2小时免费

### 导航信息
- **百度地图**: 搜索"活在肥宣科技"
- **高德地图**: 搜索"活在肥宣科技"
- **腾讯地图**: 搜索"活在肥宣科技"

我们期待与您的交流，让我们一起创造更美好的未来！`
            }
        };
    }
    
    toggleSidebar() {
        this.sidebar?.classList.toggle('show');
    }
    
    closeSidebar() {
        this.sidebar?.classList.remove('show');
    }
    
    handleNavigation(e) {
        e.preventDefault();
        
        const target = e.target.closest('.nav-link');
        if (!target) return;
        
        // Handle submenu toggle
        if (target.dataset.toggle === 'submenu') {
            const navItem = target.parentElement;
            navItem.classList.toggle('expanded');
            return;
        }
        
        // Handle route navigation
        const route = target.dataset.route;
        if (route) {
            this.navigateToRoute(route);
            
            // Close mobile menu
            if (window.innerWidth <= 768) {
                this.closeSidebar();
            }
        }
    }
    
    navigateToRoute(route, pushState = true) {
        if (this.isLoading || route === this.currentRoute) return;
        
        this.showLoading();
        
        // Simulate loading delay for better UX
        setTimeout(() => {
            this.handleRouteChange(route, pushState);
            this.hideLoading();
        }, 300);
    }
    
    handleRouteChange(route, pushState = true) {
        const contentData = this.content[route];
        if (!contentData) {
            console.error(`Route "${route}" not found`);
            return;
        }
        
        // Update navigation state
        this.updateNavigationState(route);
        
        // Update page content
        this.updatePageContent(contentData);
        
        // Update URL
        if (pushState) {
            history.pushState({ route }, '', `#${route}`);
        }
        
        this.currentRoute = route;
        
        // Update document title
        document.title = `${contentData.title} - 活在肥宣`;
    }
    
    updateNavigationState(route) {
        // Remove active state from all nav items
        const activeItems = this.navMenu?.querySelectorAll('.nav-item.active');
        activeItems?.forEach(item => item.classList.remove('active'));
        
        // Add active state to current route
        const currentNavItem = this.navMenu?.querySelector(`[data-route="${route}"]`)?.parentElement;
        if (currentNavItem) {
            currentNavItem.classList.add('active');
            
            // Expand parent submenu if needed
            const parentSubmenu = currentNavItem.closest('.submenu');
            if (parentSubmenu) {
                const parentNavItem = parentSubmenu.previousElementSibling?.parentElement;
                parentNavItem?.classList.add('expanded');
            }
        }
    }
    
    updatePageContent(contentData) {
        // Update page title
        if (this.pageTitle) {
            this.pageTitle.textContent = contentData.title;
        }
        
        // Update breadcrumb
        this.updateBreadcrumb(contentData.breadcrumb);
        
        // Render markdown content
        this.renderMarkdownContent(contentData.content);
        
        // Update table of contents
        this.updateTableOfContents();
        
        // Update metadata
        this.updateMetadata();
    }
    
    updateBreadcrumb(breadcrumbItems) {
        if (!this.breadcrumb || !breadcrumbItems) return;
        
        this.breadcrumb.innerHTML = '';
        breadcrumbItems.forEach((item, index) => {
            const link = document.createElement('a');
            link.textContent = item;
            link.href = '#';
            
            if (index < breadcrumbItems.length - 1) {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    // Handle breadcrumb navigation if needed
                });
            }
            
            this.breadcrumb.appendChild(link);
        });
    }
    
    renderMarkdownContent(markdownText) {
        if (!this.contentBody) {
            console.error('Content body not available');
            return;
        }
        
        try {
            const htmlContent = SimpleMarkdownParser.parse(markdownText);
            this.contentBody.innerHTML = `<div class="markdown-content">${htmlContent}</div>`;
            
            // Scroll to top of content
            this.mainContent?.scrollTo(0, 0);
        } catch (error) {
            console.error('Error rendering markdown:', error);
            this.contentBody.innerHTML = `<div class="markdown-content"><p>内容加载失败，请稍后重试。</p></div>`;
        }
    }
    
    updateTableOfContents() {
        if (!this.tableOfContents) return;
        
        const headings = this.contentBody?.querySelectorAll('h1, h2, h3, h4, h5, h6');
        if (!headings || headings.length === 0) {
            this.tableOfContents.innerHTML = '<ul><li>暂无目录</li></ul>';
            return;
        }
        
        let tocHtml = '<ul>';
        headings.forEach((heading, index) => {
            const id = `heading-${index}`;
            heading.id = id;
            
            const level = parseInt(heading.tagName.substring(1));
            const indent = level > 2 ? 'padding-left: ' + ((level - 2) * 1) + 'rem;' : '';
            
            tocHtml += `<li style="${indent}">
                <a href="#${id}" onclick="document.getElementById('${id}').scrollIntoView({behavior:'smooth'}); return false;">
                    ${heading.textContent}
                </a>
            </li>`;
        });
        tocHtml += '</ul>';
        
        this.tableOfContents.innerHTML = tocHtml;
    }
    
    updateMetadata() {
        // Update last updated time
        if (this.lastUpdated) {
            const now = new Date();
            this.lastUpdated.textContent = now.toLocaleDateString('zh-CN');
        }
        
        // Calculate reading time
        if (this.readingTime && this.contentBody) {
            const text = this.contentBody.textContent || '';
            const wordsPerMinute = 200; // Average reading speed
            const words = text.trim().split(/\s+/).length;
            const minutes = Math.ceil(words / wordsPerMinute);
            this.readingTime.textContent = `约${minutes}分钟`;
        }
    }
    
    performSearch() {
        const query = this.searchInput?.value.trim();
        if (!query) return;
        
        // Simple search implementation
        const results = [];
        for (const [route, data] of Object.entries(this.content)) {
            if (data.title.includes(query) || data.content.includes(query)) {
                results.push({ route, title: data.title });
            }
        }
        
        if (results.length > 0) {
            // Navigate to first result
            this.navigateToRoute(results[0].route);
        } else {
            alert('未找到相关内容，请尝试其他关键词。');
        }
    }
    
    toggleTheme() {
        // Theme switching functionality can be implemented here
        console.log('Theme toggle clicked');
    }
    
    showLoading() {
        this.isLoading = true;
        this.loadingOverlay?.classList.add('show');
    }
    
    hideLoading() {
        this.isLoading = false;
        this.loadingOverlay?.classList.remove('show');
    }
    
    loadInitialContent() {
        // Load content based on URL hash
        const hash = window.location.hash.substring(1);
        const initialRoute = hash && this.content[hash] ? hash : 'home';
        this.handleRouteChange(initialRoute, false);
    }
}

// Initialize the website when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new WebsiteManager();
});

// Add some utility functions
window.utils = {
    // Smooth scroll to element
    scrollTo: (elementId) => {
        const element = document.getElementById(elementId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    },
    
    // Copy text to clipboard
    copyToClipboard: async (text) => {
        try {
            await navigator.clipboard.writeText(text);
            console.log('Text copied to clipboard');
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    },
    
    // Format date
    formatDate: (date) => {
        return new Date(date).toLocaleDateString('zh-CN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }
};