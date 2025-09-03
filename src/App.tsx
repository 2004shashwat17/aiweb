import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  Database, 
  BookOpen, 
  Users, 
  Search, 
  ExternalLink, 
  Github, 
  GraduationCap, 
  Zap, 
  Lock,
  Brain,
  AlertTriangle,
  Menu,
  X,
  ChevronRight,
  Star,
  Filter
} from 'lucide-react';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'datasets', 'research', 'training', 'tools'];
      const scrollPosition = window.scrollY + 100;
      
      sections.forEach(section => {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const datasets = [
    {
      id: 1,
      name: "GitHub – Awesome-Cybersecurity-Datasets",
      category: "datasets",
      description: "Curated vault of datasets across all cybersecurity angles—network traffic, malware, email, phishing, fraud",
      type: "Repository",
      url: "https://github.com",
      tags: ["Network Traffic", "Malware", "Phishing", "Fraud"],
      featured: true
    },
    {
      id: 2,
      name: "Canadian Institute for Cybersecurity (CIC)",
      category: "datasets",
      description: "Academic hub with LLM data (Triple-R 2024), Graph datasets for malware analysis, IoT attack datasets",
      type: "Academic",
      url: "https://unb.ca",
      tags: ["LLM Training", "Malware Analysis", "IoT Security"],
      featured: true
    },
    {
      id: 3,
      name: "York University Cybersecurity Datasets",
      category: "datasets",
      description: "Real-world datasets including Encrypted Traffic Dataset (BCCC-DarkNet-2025) for AI model testing",
      type: "Academic",
      url: "https://yorku.ca",
      tags: ["Encrypted Traffic", "DarkNet", "AI Testing"],
      featured: false
    },
    {
      id: 4,
      name: "Primus Dataset for Cybersecurity LLMs",
      category: "research",
      description: "Full suite for cybersecurity LLM training (pretraining, fine-tuning, reasoning). Boosts CISSP scores by 10–16%",
      type: "Research",
      url: "https://arxiv.org",
      tags: ["LLM", "CISSP", "Benchmarking"],
      featured: true
    },
    {
      id: 5,
      name: "MalNet-Image Dataset",
      category: "research",
      description: "Over 1.2M malware binary images across 696 families for vision-based AI experiments",
      type: "Research",
      url: "https://arxiv.org",
      tags: ["Malware", "Computer Vision", "Binary Analysis"],
      featured: false
    },
    {
      id: 6,
      name: "SANS Institute AI/ML Cybersecurity",
      category: "training",
      description: "SEC595: AI/ML for Cybersecurity Professionals - Industry-leading hands-on training",
      type: "Training",
      url: "https://sans.org",
      tags: ["Professional Training", "Hands-on", "SEC595"],
      featured: true
    },
    {
      id: 7,
      name: "Deep Instinct AI Prevention",
      category: "tools",
      description: "AI-driven prevention platform using deep learning to spot complex threats before they hit",
      type: "Platform",
      url: "https://deepinstinct.com",
      tags: ["Prevention", "Deep Learning", "Threat Detection"],
      featured: false
    },
    {
      id: 8,
      name: "CrowdStrike AI-Powered Attacks",
      category: "research",
      description: "Detailed breakdowns of AI-specific threats like poisoning, evasion, and tampering",
      type: "Research",
      url: "https://crowdstrike.com",
      tags: ["AI Threats", "Attack Analysis", "Defense"],
      featured: false
    }
  ];

  const filteredDatasets = datasets.filter(dataset => {
    const matchesSearch = dataset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         dataset.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         dataset.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || dataset.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-slate-900/95 backdrop-blur-sm border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Shield className="w-8 h-8 text-cyan-400" />
              <span className="text-xl font-bold text-white">CyberAI Hub</span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {[
                { id: 'home', label: 'Home' },
                { id: 'datasets', label: 'Datasets' },
                { id: 'research', label: 'Research' },
                { id: 'training', label: 'Training' },
                { id: 'tools', label: 'Tools' }
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                    activeSection === item.id 
                      ? 'text-cyan-400 border-b-2 border-cyan-400' 
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-slate-300 hover:text-white p-2"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-slate-800 border-t border-slate-700">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {[
                { id: 'home', label: 'Home' },
                { id: 'datasets', label: 'Datasets' },
                { id: 'research', label: 'Research' },
                { id: 'training', label: 'Training' },
                { id: 'tools', label: 'Tools' }
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="block w-full text-left px-3 py-2 text-slate-300 hover:text-white hover:bg-slate-700 rounded-md"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-16 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full blur-xl opacity-30 animate-pulse"></div>
                <div className="relative bg-gradient-to-r from-cyan-400 to-blue-500 p-6 rounded-full">
                  <Brain className="w-16 h-16 text-white" />
                </div>
              </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              AI Training Data &<br />
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Cybersecurity Hub
              </span>
            </h1>
            
            <p className="text-xl text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              Discover cutting-edge datasets, research papers, training platforms, and security tools 
              for AI-powered cybersecurity. Your comprehensive resource for building intelligent defense systems.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => scrollToSection('datasets')}
                className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-cyan-600 hover:to-blue-700 transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
              >
                <Database className="w-5 h-5" />
                <span>Explore Datasets</span>
                <ChevronRight className="w-5 h-5" />
              </button>
              
              <button
                onClick={() => scrollToSection('research')}
                className="border-2 border-cyan-400 text-cyan-400 px-8 py-4 rounded-lg font-semibold hover:bg-cyan-400 hover:text-slate-900 transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <BookOpen className="w-5 h-5" />
                <span>View Research</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="bg-slate-800/50 py-8 border-y border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search resources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
              />
            </div>
            
            <div className="flex items-center space-x-4">
              <Filter className="text-slate-400 w-5 h-5" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
              >
                <option value="all">All Categories</option>
                <option value="datasets">Datasets</option>
                <option value="research">Research</option>
                <option value="training">Training</option>
                <option value="tools">Tools</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Datasets Section */}
      <section id="datasets" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Database className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
            <h2 className="text-4xl font-bold text-white mb-4">Premium Datasets</h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Access curated datasets from leading institutions and research organizations worldwide
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDatasets.map((dataset) => (
              <div
                key={dataset.id}
                className="bg-slate-800/80 backdrop-blur-sm rounded-xl p-6 border border-slate-700 hover:border-cyan-400/50 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-400/10 group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    {dataset.category === 'datasets' && <Database className="w-6 h-6 text-cyan-400" />}
                    {dataset.category === 'research' && <BookOpen className="w-6 h-6 text-green-400" />}
                    {dataset.category === 'training' && <GraduationCap className="w-6 h-6 text-orange-400" />}
                    {dataset.category === 'tools' && <Zap className="w-6 h-6 text-purple-400" />}
                    <span className="text-xs px-2 py-1 bg-slate-700 text-slate-300 rounded-full">
                      {dataset.type}
                    </span>
                  </div>
                  {dataset.featured && (
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  )}
                </div>
                
                <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-cyan-400 transition-colors duration-200">
                  {dataset.name}
                </h3>
                
                <p className="text-slate-300 mb-4 line-clamp-3">
                  {dataset.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {dataset.tags.slice(0, 3).map((tag, index) => (
                    <span
                      key={index}
                      className="text-xs px-2 py-1 bg-slate-700 text-slate-300 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center justify-between">
                  <a
                    href={dataset.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-cyan-400 hover:text-cyan-300 transition-colors duration-200"
                  >
                    <span className="text-sm font-medium">Explore</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Research Section */}
      <section id="research" className="py-20 bg-slate-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <BookOpen className="w-12 h-12 text-green-400 mx-auto mb-4" />
            <h2 className="text-4xl font-bold text-white mb-4">Latest Research</h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Stay updated with cutting-edge research papers and academic publications
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {[
              {
                title: "CAI Fluency Framework",
                date: "August 2025",
                description: "Education-first framework for cybersecurity AI skills and ethics development",
                journal: "ArXiv",
                tags: ["Education", "Ethics", "Framework"]
              },
              {
                title: "AdaPhish Real-time Training",
                date: "February 2025",
                description: "Real-time, AI-powered phishing training tool with adaptive learning",
                journal: "ArXiv",
                tags: ["Phishing", "Real-time", "Adaptive"]
              },
              {
                title: "AI Threats & Mitigation",
                date: "2022",
                description: "Holistic view of AI threat dynamics and comprehensive defense strategies",
                journal: "ArXiv",
                tags: ["Threats", "Mitigation", "Defense"]
              },
              {
                title: "AI-Assisted Malware Analysis",
                date: "2020",
                description: "Course modules blending ML techniques with practical threat hunting",
                journal: "ArXiv",
                tags: ["Malware", "ML", "Education"]
              }
            ].map((paper, index) => (
              <div
                key={index}
                className="bg-slate-800/80 rounded-xl p-6 border border-slate-700 hover:border-green-400/50 transition-all duration-300 hover:shadow-xl hover:shadow-green-400/10"
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="text-xs px-3 py-1 bg-green-400/20 text-green-400 rounded-full">
                    {paper.journal}
                  </span>
                  <span className="text-xs text-slate-400">{paper.date}</span>
                </div>
                
                <h3 className="text-xl font-semibold text-white mb-3">
                  {paper.title}
                </h3>
                
                <p className="text-slate-300 mb-4">
                  {paper.description}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {paper.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="text-xs px-2 py-1 bg-slate-700 text-slate-300 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Training Section */}
      <section id="training" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <GraduationCap className="w-12 h-12 text-orange-400 mx-auto mb-4" />
            <h2 className="text-4xl font-bold text-white mb-4">Professional Training</h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Level up your skills with industry-leading cybersecurity and AI training programs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "NSA AI Security Center",
                description: "Deep dive into AI safety, red teaming, and secure deployment strategies",
                type: "Government",
                features: ["AI Safety", "Red Teaming", "Secure Deployment"]
              },
              {
                name: "CISA AI Playbook",
                description: "Comprehensive frameworks for AI security implementation and best practices",
                type: "Government",
                features: ["Frameworks", "Best Practices", "Implementation"]
              },
              {
                name: "SANS SEC595 Course",
                description: "AI/ML for Cybersecurity Professionals with hands-on practical training",
                type: "Professional",
                features: ["Hands-on", "Professional", "Certification"]
              }
            ].map((course, index) => (
              <div
                key={index}
                className="bg-slate-800/80 rounded-xl p-6 border border-slate-700 hover:border-orange-400/50 transition-all duration-300 hover:shadow-xl hover:shadow-orange-400/10"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <GraduationCap className="w-6 h-6 text-orange-400" />
                  <span className="text-xs px-2 py-1 bg-orange-400/20 text-orange-400 rounded-full">
                    {course.type}
                  </span>
                </div>
                
                <h3 className="text-xl font-semibold text-white mb-3">
                  {course.name}
                </h3>
                
                <p className="text-slate-300 mb-4">
                  {course.description}
                </p>
                
                <div className="space-y-2">
                  {course.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-2 text-sm text-slate-300">
                      <ChevronRight className="w-4 h-4 text-orange-400" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section id="tools" className="py-20 bg-slate-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Zap className="w-12 h-12 text-purple-400 mx-auto mb-4" />
            <h2 className="text-4xl font-bold text-white mb-4">Security Tools</h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Discover AI-powered security platforms and tools for modern threat detection
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                name: "Deep Instinct",
                description: "AI-driven prevention platform using deep learning to identify and stop threats before execution",
                category: "Prevention",
                features: ["Deep Learning", "Real-time Protection", "Zero-day Detection"],
                icon: <Shield className="w-8 h-8 text-purple-400" />
              },
              {
                name: "Jericho Security",
                description: "AI-powered phishing simulations with role-based adaptive training for organizations",
                category: "Training",
                features: ["Phishing Simulation", "Adaptive Learning", "Role-based Training"],
                icon: <AlertTriangle className="w-8 h-8 text-red-400" />
              },
              {
                name: "CrowdStrike Insights",
                description: "Advanced threat intelligence with AI-powered attack analysis and mitigation strategies",
                category: "Intelligence",
                features: ["Threat Intelligence", "Attack Analysis", "Mitigation"],
                icon: <Lock className="w-8 h-8 text-green-400" />
              },
              {
                name: "Open Threat Exchange",
                description: "Crowdsourced threat intelligence platform providing real-time indicators and pulses",
                category: "Intelligence",
                features: ["Crowdsourced Intel", "Real-time Updates", "Community Driven"],
                icon: <Users className="w-8 h-8 text-blue-400" />
              }
            ].map((tool, index) => (
              <div
                key={index}
                className="bg-slate-800/80 rounded-xl p-6 border border-slate-700 hover:border-purple-400/50 transition-all duration-300 hover:shadow-xl hover:shadow-purple-400/10"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    {tool.icon}
                    <div>
                      <h3 className="text-xl font-semibold text-white">{tool.name}</h3>
                      <span className="text-sm text-purple-400">{tool.category}</span>
                    </div>
                  </div>
                </div>
                
                <p className="text-slate-300 mb-6">
                  {tool.description}
                </p>
                
                <div className="space-y-2">
                  {tool.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-2 text-sm text-slate-300">
                      <ChevronRight className="w-4 h-4 text-purple-400" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-700 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <Shield className="w-8 h-8 text-cyan-400" />
                <span className="text-xl font-bold text-white">CyberAI Hub</span>
              </div>
              <p className="text-slate-300 mb-6 max-w-md">
                Your comprehensive resource for AI training data and cybersecurity tools. 
                Empowering the next generation of intelligent security systems.
              </p>
              <div className="flex space-x-4">
                <Github className="w-6 h-6 text-slate-400 hover:text-white cursor-pointer transition-colors duration-200" />
                <BookOpen className="w-6 h-6 text-slate-400 hover:text-white cursor-pointer transition-colors duration-200" />
                <Shield className="w-6 h-6 text-slate-400 hover:text-white cursor-pointer transition-colors duration-200" />
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-slate-300">
                <li><a href="#" className="hover:text-white transition-colors duration-200">Datasets</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">Research Papers</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">Training Courses</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">Security Tools</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Community</h4>
              <ul className="space-y-2 text-slate-300">
                <li><a href="#" className="hover:text-white transition-colors duration-200">Contribute</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">Support</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">Contact</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-700 mt-12 pt-8 text-center">
            <p className="text-slate-400">
              © 2025 CyberAI Hub. Built for the cybersecurity community. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;