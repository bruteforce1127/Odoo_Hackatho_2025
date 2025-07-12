// Theme Management
class ThemeManager {
  constructor() {
    this.themeToggle = document.getElementById("themeToggle");
    this.themeIcon = document.querySelector(".theme-icon");
    this.currentTheme = this.getStoredTheme() || this.getSystemTheme();
    
    this.init();
  }

  init() {
    this.setTheme(this.currentTheme);
    this.themeToggle.addEventListener("click", () => this.toggleTheme());

    // Listen for system theme changes
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
      if (!this.getStoredTheme()) {
        this.setTheme(e.matches ? "dark" : "light");
      }
    });
  }

  toggleTheme() {
    const newTheme = this.currentTheme === "dark" ? "light" : "dark";
    this.setTheme(newTheme);
    this.storeTheme(newTheme);
    this.showNotification(Switched to ${newTheme} mode);

    // Add rotation animation
    this.themeIcon.style.transform = "rotate(360deg)";
    setTimeout(() => {
      this.themeIcon.style.transform = "rotate(0deg)";
    }, 300);
  }

  setTheme(theme) {
    this.currentTheme = theme;
    document.documentElement.setAttribute("data-theme", theme);
    
    // Update icon
    this.themeIcon.textContent = theme === "dark" ? "☀" : "🌙";
    
    // Update aria-label
    this.themeToggle.setAttribute("aria-label", 
        Switch to ${theme === "dark" ? "light" : "dark"} mode);
  }

  getStoredTheme() {
    return localStorage.getItem("stackit-theme");
  }

  storeTheme(theme) {
    localStorage.setItem("stackit-theme", theme);
  }

  getSystemTheme() {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  showNotification(message) {
    const notification = document.createElement("div");
    notification.className = "notification";
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => notification.classList.add("show"), 100);
    setTimeout(() => {
      notification.classList.remove("show");
      setTimeout(() => {
        if (document.body.contains(notification)) {
          document.body.removeChild(notification);
        }
      }, 300);
    }, 2000);
  }
}

// Application State Management
class AppState {
  constructor() {
    this.currentPage = 1;
    this.currentFilter = "newest";
    this.searchQuery = "";
    this.questionsPerPage = 5;
    this.questions = this.getMockQuestions();
    this.filteredQuestions = [...this.questions];
    this.currentView = "list"; // list or grid
  }

  getMockQuestions() {
    return [
      {
        id: 1,
        title: "How to join 2 columns in a data set to make a separate column in SQL",
        preview: "I do not know the code for it as I am a beginner. As an example what I need to do is like there is a column 1 containing First name, and column 2 consists of last name I want a column to combine both columns into a new column called Full Name.",
        tags: ["sql", "database", "beginner", "mysql"],
        author: "John Developer",
        timeAgo: "5 hours ago",
        answers: 3,
        votes: 12,
        views: 156,
        createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
        isAnswered: true
      },
      {
        id: 2,
        title: "How to implement async/await in JavaScript properly?",
        preview: "I'm having trouble understanding when to use async/await vs promises. Can someone explain the best practices and common pitfalls? I keep getting unhandled promise rejection errors.",
        tags: ["javascript", "async", "promises", "es6"],
        author: "Sarah CodeMaster",
        timeAgo: "3 hours ago",
        answers: 7,
        votes: 25,
        views: 342,
        createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000),
        isAnswered: true
      },
      {
        id: 3,
        title: "React useState not updating immediately - Why?",
        preview: "I'm calling setState but the state doesn't seem to update immediately. Is this normal behavior? How can I work with the updated state right after setting it?",
        tags: ["react", "hooks", "state", "javascript"],
        author: "Mike ReactDev",
        timeAgo: "2 hours ago",
        answers: 4,
        votes: 18,
        views: 289,
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
        isAnswered: true
      },
      {
        id: 4,
        title: "CSS Grid vs Flexbox - when to use which?",
        preview: "I'm confused about when to use CSS Grid and when to use Flexbox. What are the main differences and use cases for each? Can they be used together?",
        tags: ["css", "grid", "flexbox", "layout"],
        author: "Emma StyleGuru",
        timeAgo: "1 hour ago",
        answers: 0,
        votes: 8,
        views: 124,
        createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000),
        isAnswered: false
      },
      {
        id: 5,
        title: "Python list comprehension with multiple conditions",
        preview: "How can I write a list comprehension that filters based on multiple conditions? I want to make my code more pythonic and readable.",
        tags: ["python", "list-comprehension", "filtering"],
        author: "Alex PythonPro",
        timeAgo: "30 minutes ago",
        answers: 2,
        votes: 15,
        views: 87,
        createdAt: new Date(Date.now() - 30 * 60 * 1000),
        isAnswered: true
      },
      {
        id: 6,
        title: "Understanding Docker containers and images",
        preview: "What's the difference between Docker containers and images? How do they work together in a typical development workflow? I'm new to containerization.",
        tags: ["docker", "containers", "devops", "deployment"],
        author: "Chris DevOpsGuru",
        timeAgo: "1 hour ago",
        answers: 1,
        votes: 9,
        views: 203,
        createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000),
        isAnswered: true
      },
      {
        id: 7,
        title: "How to optimize React app performance?",
        preview: "My React application is getting slower as it grows. What are the best practices for optimizing performance? Should I use React.memo everywhere?",
        tags: ["react", "performance", "optimization", "memo"],
        author: "Lisa ReactExpert",
        timeAgo: "4 hours ago",
        answers: 5,
        votes: 22,
        views: 445,
        createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
        isAnswered: true
      },
      {
        id: 8,
        title: "Node.js vs Python for backend development",
        preview: "I'm starting a new project and can't decide between Node.js and Python for the backend. What are the pros and cons of each?",
        tags: ["nodejs", "python", "backend", "comparison"],
        author: "Tom BackendDev",
        timeAgo: "6 hours ago",
        answers: 0,
        votes: 6,
        views: 178,
        createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
        isAnswered: false
      }
    ];
  }

  filterQuestions(filter) {
    this.currentFilter = filter;
    let filtered = [...this.questions];

    // Apply search filter first
    if (this.searchQuery) {
      filtered = filtered.filter(q => 
          q.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          q.preview.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          q.tags.some(tag => tag.toLowerCase().includes(this.searchQuery.toLowerCase())) ||
          q.author.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }

    // Apply sorting filter
    switch (filter) {
      case "newest":
        filtered.sort((a, b) => b.createdAt - a.createdAt);
        break;
      case "unanswered":
        filtered = filtered.filter(q => q.answers === 0);
        break;
      case "active":
        filtered.sort((a, b) => b.votes - a.votes);
        break;
      case "votes":
        filtered.sort((a, b) => b.votes - a.votes);
        break;
      case "views":
        filtered.sort((a, b) => b.views - a.views);
        break;
    }

    this.filteredQuestions = filtered;
    this.currentPage = 1; // Reset to first page
    return filtered;
  }

  searchQuestions(query) {
    this.searchQuery = query.trim();
    return this.filterQuestions(this.currentFilter);
  }

  getQuestionsForPage(page) {
    const startIndex = (page - 1) * this.questionsPerPage;
    const endIndex = startIndex + this.questionsPerPage;
    return this.filteredQuestions.slice(startIndex, endIndex);
  }

  getTotalPages() {
    return Math.ceil(this.filteredQuestions.length / this.questionsPerPage);
  }

  setCurrentPage(page) {
    const totalPages = this.getTotalPages();
    if (page >= 1 && page <= totalPages) {
      this.currentPage = page;
      return true;
    }
    return false;
  }

  setView(view) {
    this.currentView = view;
  }
}

// Question Renderer
class QuestionRenderer {
  constructor(container) {
    this.container = container;
  }

  render(questions, view = "list") {
    this.container.innerHTML = "";

    if (questions.length === 0) {
      this.renderNoResults();
      return;
    }

    // Add view class to container
    this.container.className = main-content ${view}-view;

    questions.forEach((question, index) => {
      const questionCard = this.createQuestionCard(question, view);
      this.container.appendChild(questionCard);

      // Animate in
      setTimeout(() => {
        questionCard.style.opacity = "1";
        questionCard.style.transform = "translateY(0)";
      }, index * 100);
    });
  }

  createQuestionCard(question, view) {
    const questionCard = document.createElement("article");
    questionCard.className = "question-card";
    questionCard.style.opacity = "0";
    questionCard.style.transform = "translateY(20px)";
    questionCard.style.transition = "opacity 0.5s ease, transform 0.5s ease";

    questionCard.innerHTML = `
      <div class="question-header">
        <h2 class="question-title" data-question-id="${question.id}">${question.title}</h2>
        <span class="time-badge">${question.timeAgo}</span>
      </div>
      <div class="question-meta">
        <div class="tags">
          ${question.tags.map(tag => <span class="tag" data-tag="${tag}">${tag}</span>).join("")}
        </div>
        <div class="question-stats">
          <span class="stat">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
            </svg>
            ${question.votes} votes
          </span>
          <span class="stat ${question.isAnswered ? 'answered' : 'unanswered'}">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
            ${question.answers} answers
          </span>
          <span class="stat">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
              <circle cx="12" cy="12" r="3"/>
            </svg>
            ${question.views} views
          </span>
        </div>
        <span class="username" data-user="${question.author}">${question.author}</span>
      </div>
      <p class="question-preview">${question.preview}</p>
      <div class="question-actions">
        <div class="vote-section">
          <button class="vote-btn vote-up" data-question-id="${question.id}" data-type="up">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M7 13l3 3 7-7"/>
            </svg>
          </button>
          <span class="vote-count">${question.votes}</span>
          <button class="vote-btn vote-down" data-question-id="${question.id}" data-type="down">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
        <div class="action-buttons">
          <button class="action-btn bookmark-btn" data-question-id="${question.id}">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
            </svg>
            Save
          </button>
          <button class="action-btn share-btn" data-question-id="${question.id}">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="18" cy="5" r="3"/>
              <circle cx="6" cy="12" r="3"/>
              <circle cx="18" cy="19" r="3"/>
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
            </svg>
            Share
          </button>
        </div>
      </div>
    `;

    // Add event listeners
    this.addQuestionEventListeners(questionCard, question);

    return questionCard;
  }

  addQuestionEventListeners(card, question) {
    // Question title click
    const title = card.querySelector(".question-title");
    title.addEventListener("click", () => {
      console.log(Opening question: ${question.title});
      this.showQuestionModal(question);
    });

    // Tag clicks
    const tags = card.querySelectorAll(".tag");
    tags.forEach(tag => {
      tag.addEventListener("click", (e) => {
        e.stopPropagation();
        const tagName = tag.dataset.tag;
        console.log(Filtering by tag: ${tagName});
        window.dispatchEvent(new CustomEvent("tagSearch", { 
          detail: { tag: tagName } 
        }));
      });
    });

    // Vote buttons
    const voteButtons = card.querySelectorAll(".vote-btn");
    voteButtons.forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        this.handleVote(btn.dataset.questionId, btn.dataset.type);
      });
    });

    // Action buttons
    const bookmarkBtn = card.querySelector(".bookmark-btn");
    bookmarkBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      this.handleBookmark(question.id);
    });

    const shareBtn = card.querySelector(".share-btn");
    shareBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      this.handleShare(question);
    });

    // Username click
    const username = card.querySelector(".username");
    username.addEventListener("click", (e) => {
      e.stopPropagation();
      this.showUserProfile(question.author);
    });
  }

  handleVote(questionId, type) {
    console.log(${type} vote for question ${questionId});
    // In a real app, this would make an API call
    window.themeManager.showNotification(${type === 'up' ? 'Upvoted' : 'Downvoted'} question!);
  }

  handleBookmark(questionId) {
    console.log(Bookmarking question ${questionId});
    window.themeManager.showNotification("Question bookmarked!");
  }

  handleShare(question) {
    if (navigator.share) {
      navigator.share({
        title: question.title,
        text: question.preview,
        url: window.location.href
      });
    } else {
      // Fallback to clipboard
      navigator.clipboard.writeText(window.location.href).then(() => {
        window.themeManager.showNotification("Link copied to clipboard!");
      });
    }
  }

  showUserProfile(username) {
    console.log(Showing profile for ${username});
    window.themeManager.showNotification(Opening ${username}'s profile...);
  }

  showQuestionModal(question) {
    // Create modal overlay
    const modal = document.createElement("div");
    modal.className = "modal-overlay";
    modal.innerHTML = `
      <div class="modal-content">
        <div class="modal-header">
          <h2>${question.title}</h2>
          <button class="modal-close">&times;</button>
        </div>
        <div class="modal-body">
          <div class="question-meta">
            <div class="tags">
              ${question.tags.map(tag => <span class="tag">${tag}</span>).join("")}
            </div>
            <span class="author">Asked by ${question.author} ${question.timeAgo}</span>
          </div>
          <p class="question-content">${question.preview}</p>
          <div class="question-stats">
            <span>${question.votes} votes</span>
            <span>${question.answers} answers</span>
            <span>${question.views} views</span>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn-primary">Answer Question</button>
          <button class="btn-secondary">Follow Question</button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);
    
    // Add event listeners
    const closeBtn = modal.querySelector(".modal-close");
    closeBtn.addEventListener("click", () => {
      document.body.removeChild(modal);
    });

    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        document.body.removeChild(modal);
      }
    });

    // Animate in
    setTimeout(() => modal.classList.add("show"), 10);
  }

  renderNoResults() {
    this.container.innerHTML = `
      <div class="no-results">
        <div class="no-results-icon">🔍</div>
        <h3>No questions found</h3>
        <p>Try adjusting your search or filter criteria, or ask a new question!</p>
        <button class="ask-btn" onclick="window.stackItApp.showAskQuestionModal()">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="12" y1="5" x2="12" y2="19"/>
            <line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          Ask a Question
        </button>
      </div>
    `;
  }
}

// Pagination Manager
class PaginationManager {
  constructor(container, appState) {
    this.container = container;
    this.appState = appState;
  }

  render() {
    const totalPages = this.appState.getTotalPages();
    const currentPage = this.appState.currentPage;
    
    this.container.innerHTML = "";

    if (totalPages <= 1) return;

    // Previous button
    const prevBtn = this.createPageButton("‹", currentPage > 1);
    prevBtn.addEventListener("click", () => this.goToPage(currentPage - 1));
    this.container.appendChild(prevBtn);

    // Page numbers with smart pagination
    const pageNumbers = this.getPageNumbers(currentPage, totalPages);
    pageNumbers.forEach(pageNum => {
      if (pageNum === "...") {
        const ellipsis = document.createElement("span");
        ellipsis.className = "pagination-ellipsis";
        ellipsis.textContent = "...";
        this.container.appendChild(ellipsis);
      } else {
        const pageBtn = this.createPageButton(pageNum.toString(), true, pageNum === currentPage);
        pageBtn.addEventListener("click", () => this.goToPage(pageNum));
        this.container.appendChild(pageBtn);
      }
    });

    // Next button
    const nextBtn = this.createPageButton("›", currentPage < totalPages);
    nextBtn.addEventListener("click", () => this.goToPage(currentPage + 1));
    this.container.appendChild(nextBtn);
  }

  getPageNumbers(current, total) {
    const pages = [];
    
    if (total <= 7) {
      for (let i = 1; i <= total; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      
      if (current > 4) {
        pages.push("...");
      }
      
      const start = Math.max(2, current - 1);
      const end = Math.min(total - 1, current + 1);
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      
      if (current < total - 3) {
        pages.push("...");
      }
      
      pages.push(total);
    }
    
    return pages;
  }

  createPageButton(text, enabled, active = false) {
    const button = document.createElement("button");
    button.className = page-btn ${active ? "active" : ""};
    button.textContent = text;
    button.disabled = !enabled;
    return button;
  }

  goToPage(page) {
    if (this.appState.setCurrentPage(page)) {
      window.dispatchEvent(new CustomEvent("pageChanged", { 
        detail: { page } 
      }));
      
      // Smooth scroll to top
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }
}

// Loading Manager
class LoadingManager {
  constructor() {
    this.loadingScreen = document.getElementById("loadingScreen");
  }

  show() {
    if (this.loadingScreen) {
      this.loadingScreen.classList.remove("hidden");
    }
  }

  hide() {
    if (this.loadingScreen) {
      this.loadingScreen.classList.add("hidden");
      setTimeout(() => {
        this.loadingScreen.style.display = "none";
      }, 500);
    }
  }
}

// Main Application
class StackItApp {
  constructor() {
    this.appState = new AppState();
    this.questionRenderer = new QuestionRenderer(document.getElementById("mainContent"));
    this.paginationManager = new PaginationManager(
      document.getElementById("pagination"), 
      this.appState
    );
    this.loadingManager = new LoadingManager();
    
    this.searchTimeout = null;
    this.init();
  }

  init() {
    this.bindEventListeners();
    this.updateStats();
    this.renderContent();
    
    // Hide loading screen after initialization
    setTimeout(() => {
      this.loadingManager.hide();
    }, 1000);
  }

  bindEventListeners() {
    // Login button
    document.querySelector(".login-btn").addEventListener("click", () => {
      this.showLoginModal();
    });

    // Ask question buttons
    document.querySelectorAll(".ask-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        this.showAskQuestionModal();
      });
    });

    // FAB button
    document.getElementById("fabBtn").addEventListener("click", () => {
      this.showAskQuestionModal();
    });

    // Tab buttons
    document.querySelectorAll(".tab-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        this.handleTabSwitch(e.target);
      });
    });

    // View toggle buttons
    document.querySelectorAll(".view-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        this.handleViewChange(e.target);
      });
    });

    // Dropdown menu items
    document.querySelectorAll(".dropdown-content a").forEach(link => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const filter = link.dataset.filter;
        this.handleFilterChange(filter);
      });
    });

    // Search functionality
    const searchInputs = document.querySelectorAll(".search-input, .search-input-hero");
    const searchBtns = document.querySelectorAll(".search-btn, .search-btn-hero");

    searchBtns.forEach(btn => {
      btn.addEventListener("click", () => this.performSearch());
    });

    searchInputs.forEach(input => {
      input.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
          this.performSearch();
        }
      });

      // Real-time search with debouncing
      input.addEventListener("input", () => {
        clearTimeout(this.searchTimeout);
        this.searchTimeout = setTimeout(() => {
          this.performSearch();
        }, 500);
      });
    });

    // Popular tags
    document.querySelectorAll(".popular-tag").forEach(tag => {
      tag.addEventListener("click", (e) => {
        const tagName = e.target.dataset.tag;
        this.handleTagSearch(tagName);
      });
    });

    // Clear filters
    document.getElementById("clearFilters").addEventListener("click", () => {
      this.clearAllFilters();
    });

    // Notification button
    document.getElementById("notificationBtn").addEventListener("click", () => {
      this.showNotifications();
    });

    // Back to top button
    const backToTopBtn = document.getElementById("backToTop");
    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    // Show/hide back to top button on scroll
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 300) {
        backToTopBtn.classList.add("visible");
      } else {
        backToTopBtn.classList.remove("visible");
      }
    });

    // Custom events
    window.addEventListener("tagSearch", (e) => {
      this.handleTagSearch(e.detail.tag);
    });

    window.addEventListener("pageChanged", () => {
      this.renderContent();
    });

    // Keyboard shortcuts
    document.addEventListener("keydown", (e) => {
      // Ctrl/Cmd + K to focus search
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        document.querySelector(".search-input").focus();
      }

      // Escape to clear search
      if (e.key === "Escape") {
        const activeElement = document.activeElement;
        if (activeElement.classList.contains("search-input") || 
            activeElement.classList.contains("search-input-hero")) {
          activeElement.value = "";
          this.performSearch();
          activeElement.blur();
        }
      }

      // Ctrl/Cmd + Enter to ask question
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        this.showAskQuestionModal();
      }
    });
  }

  handleTabSwitch(clickedTab) {
    // Remove active class from all tabs
    document.querySelectorAll(".tab-btn").forEach(tab => 
      tab.classList.remove("active"));
    
    // Add active class to clicked tab
    clickedTab.classList.add("active");

    const filter = clickedTab.dataset.filter;
    this.handleFilterChange(filter);
  }

  handleViewChange(clickedBtn) {
    // Remove active class from all view buttons
    document.querySelectorAll(".view-btn").forEach(btn => 
      btn.classList.remove("active"));
    
    // Add active class to clicked button
    clickedBtn.classList.add("active");

    const view = clickedBtn.dataset.view;
    this.appState.setView(view);
    this.renderContent();
  }

  handleFilterChange(filter) {
    console.log(Switching to filter: ${filter});
    this.appState.filterQuestions(filter);
    this.updateFilterSummary();
    this.renderContent();
  }

  performSearch() {
    const searchTerm = document.querySelector(".search-input").value || 
                     document.querySelector(".search-input-hero").value;
    
    // Sync search inputs
    document.querySelectorAll(".search-input, .search-input-hero").forEach(input => {
      input.value = searchTerm;
    });

    console.log(Searching for: ${searchTerm});
    
    this.appState.searchQuestions(searchTerm);
    this.updateFilterSummary();
    this.renderContent();

    if (searchTerm && this.appState.filteredQuestions.length === 0) {
      console.log(No results found for "${searchTerm}");
    }
  }

  handleTagSearch(tag) {
    const searchInputs = document.querySelectorAll(".search-input, .search-input-hero");
    searchInputs.forEach(input => {
      input.value = tag;
    });
    this.performSearch();
  }

  clearAllFilters() {
    // Clear search
    document.querySelectorAll(".search-input, .search-input-hero").forEach(input => {
      input.value = "";
    });
    
    // Reset to newest filter
    document.querySelectorAll(".tab-btn").forEach(tab => 
      tab.classList.remove("active"));
    document.querySelector('[data-filter="newest"]').classList.add("active");
    
    this.appState.searchQuestions("");
    this.appState.filterQuestions("newest");
    this.updateFilterSummary();
    this.renderContent();
    
    window.themeManager.showNotification("Filters cleared");
  }

  updateStats() {
    const totalQuestions = this.appState.questions.length;
    document.getElementById("totalQuestions").textContent = totalQuestions;
  }

  updateFilterSummary() {
    const resultsCount = document.getElementById("resultsCount");
    const activeFilter = document.getElementById("activeFilter");
    const clearFilters = document.getElementById("clearFilters");
    
    const count = this.appState.filteredQuestions.length;
    resultsCount.textContent = ${count} question${count !== 1 ? 's' : ''};
    
    let filterText = sorted by ${this.appState.currentFilter};
    if (this.appState.searchQuery) {
      filterText += ` • searching "${this.appState.searchQuery}"`;
      clearFilters.style.display = "flex";
    } else {
      clearFilters.style.display = "none";
    }
    
    activeFilter.textContent = filterText;
  }

  showLoginModal() {
    const modal = document.createElement("div");
    modal.className = "modal-overlay";
    modal.innerHTML = `
      <div class="modal-content login-modal">
        <div class="modal-header">
          <h2>Welcome to StackIt</h2>
          <button class="modal-close">&times;</button>
        </div>
        <div class="modal-body">
          <div class="login-options">
            <button class="social-login github">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              Continue with GitHub
            </button>
            <button class="social-login google">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Continue with Google
            </button>
          </div>
          <div class="divider">
            <span>or</span>
          </div>
          <form class="login-form">
            <div class="form-group">
              <label for="email">Email</label>
              <input type="email" id="email" required>
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <input type="password" id="password" required>
            </div>
            <button type="submit" class="btn-primary">Sign In</button>
          </form>
          <p class="signup-link">
            Don't have an account? <a href="#" class="link">Sign up</a>
          </p>
        </div>
      </div>
    `;

    this.showModal(modal);
  }

  showAskQuestionModal() {
    const modal = document.createElement("div");
    modal.className = "modal-overlay";
    modal.innerHTML = `
      <div class="modal-content ask-modal">
        <div class="modal-header">
          <h2>Ask a Question</h2>
          <button class="modal-close">&times;</button>
        </div>
        <div class="modal-body">
          <form class="ask-form">
            <div class="form-group">
              <label for="questionTitle">Title</label>
              <input type="text" id="questionTitle" placeholder="What's your programming question?" required>
              <small>Be specific and imagine you're asking a question to another person</small>
            </div>
            <div class="form-group">
              <label for="questionBody">Body</label>
              <textarea id="questionBody" rows="8" placeholder="Include all the information someone would need to answer your question" required></textarea>
            </div>
            <div class="form-group">
              <label for="questionTags">Tags</label>
              <input type="text" id="questionTags" placeholder="e.g. javascript, react, css">
              <small>Add up to 5 tags to describe what your question is about</small>
            </div>
            <div class="form-actions">
              <button type="button" class="btn-secondary modal-close">Cancel</button>
              <button type="submit" class="btn-primary">Post Question</button>
            </div>
          </form>
        </div>
      </div>
    `;

    this.showModal(modal);

    // Handle form submission
    const form = modal.querySelector(".ask-form");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      window.themeManager.showNotification("Question posted successfully!");
      document.body.removeChild(modal);
    });
  }

  showNotifications() {
    const modal = document.createElement("div");
    modal.className = "modal-overlay";
    modal.innerHTML = `
      <div class="modal-content notifications-modal">
        <div class="modal-header">
          <h2>Notifications</h2>
          <button class="modal-close">&times;</button>
        </div>
        <div class="modal-body">
          <div class="notification-list">
            <div class="notification-item unread">
              <div class="notification-icon">💬</div>
              <div class="notification-content">
                <p><strong>New answer</strong> to your question "How to implement async/await"</p>
                <span class="notification-time">2 hours ago</span>
              </div>
            </div>
            <div class="notification-item unread">
              <div class="notification-icon">⭐</div>
              <div class="notification-content">
                <p>Your answer received <strong>5 upvotes</strong></p>
                <span class="notification-time">4 hours ago</span>
              </div>
            </div>
            <div class="notification-item">
              <div class="notification-icon">🏆</div>
              <div class="notification-content">
                <p>You earned the <strong>"Helpful"</strong> badge</p>
                <span class="notification-time">1 day ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    this.showModal(modal);
  }

  showModal(modal) {
    document.body.appendChild(modal);
    
    // Add event listeners
    const closeBtns = modal.querySelectorAll(".modal-close");
    closeBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        document.body.removeChild(modal);
      });
    });

    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        document.body.removeChild(modal);
      }
    });

    // Animate in
    setTimeout(() => modal.classList.add("show"), 10);
  }

  renderContent() {
    const questions = this.appState.getQuestionsForPage(this.appState.currentPage);
    this.questionRenderer.render(questions, this.appState.currentView);
    this.paginationManager.render();
    this.updateFilterSummary();
  }
}

// Utility Functions
function formatTimeAgo(date) {
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);

  if (diffInSeconds < 60) return "just now";
  if (diffInSeconds < 3600) return ${Math.floor(diffInSeconds / 60)} min ago;
  if (diffInSeconds < 86400) return ${Math.floor(diffInSeconds / 3600)} hours ago;
  return ${Math.floor(diffInSeconds / 86400)} days ago;
}

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Initialize Application
document.addEventListener("DOMContentLoaded", () => {
  // Initialize theme manager
  window.themeManager = new ThemeManager();
  
  // Initialize main application
  window.stackItApp = new StackItApp();

  console.log("StackIt application initialized successfully!");
});

// Global error handling
window.addEventListener("error", (e) => {
  console.error("Global error:", e.error);
});

window.addEventListener("unhandledrejection", (e) => {
  console.error("Unhandled promise rejection:", e.reason);
});

// Add modal styles to CSS (append to existing styles)
const modalStyles = `
/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(5px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.modal-overlay.show {
  opacity: 1;
}

.modal-content {
  background: var(--bg-card);
  border-radius: 16px;
  max-width: 600px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  border: 1px solid var(--border-color);
  box-shadow: 0 20px 60px var(--shadow-color);
  transform: scale(0.9);
  transition: transform 0.3s ease;
}

.modal-overlay.show .modal-content {
  transform: scale(1);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px;
  border-bottom: 1px solid var(--border-color);
}

.modal-header h2 {
  margin: 0;
  color: var(--text-primary);
}

.modal-close {
  background: none;
  border: none;
  font-size: 24px;
  color: var(--text-muted);
  cursor: pointer;
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.3s ease;
}

.modal-close:hover {
  background: var(--bg-tertiary);
  color: var(--text-primary);
}

.modal-body {
  padding: 24px;
}

.modal-footer {
  padding: 24px;
  border-top: 1px solid var(--border-color);
  display: flex;
  gap: 12px;
  justify-content: flex-end;
}

/* Form Styles */
.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: var(--text-primary);
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  background: var(--bg-secondary);
  color: var(--text-primary);
  font-size: 14px;
  transition: border-color 0.3s ease;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--accent-color);
  box-shadow: 0 0 0 3px var(--accent-light);
}

.form-group small {
  display: block;
  margin-top: 4px;
  color: var(--text-muted);
  font-size: 12px;
}

.form-actions {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 24px;
}

.btn-primary {
  background: var(--gradient-primary);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-primary:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 15px var(--shadow-hover);
}

.btn-secondary {
  background: transparent;
  color: var(--text-secondary);
  border: 1px solid var(--border-color);
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-secondary:hover {
  background: var(--bg-tertiary);
  color: var(--text-primary);
}

/* Social Login Styles */
.social-login {
  width: 100%;
  padding: 12px;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  background: var(--bg-secondary);
  color: var(--text-primary);
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-bottom: 12px;
}

.social-login:hover {
  background: var(--bg-tertiary);
  border-color: var(--border-hover);
}

.divider {
  text-align: center;
  margin: 20px 0;
  position: relative;
}

.divider::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 1px;
  background: var(--border-color);
}

.divider span {
  background: var(--bg-card);
  padding: 0 16px;
  color: var(--text-muted);
  font-size: 14px;
}

.signup-link {
  text-align: center;
  margin-top: 20px;
  color: var(--text-secondary);
}

.link {
  color: var(--accent-color);
  text-decoration: none;
}

.link:hover {
  text-decoration: underline;
}

/* Notification List Styles */
.notification-list {
  max-height: 400px;
  overflow-y: auto;
}

.notification-item {
  display: flex;
  gap: 12px;
  padding: 16px;
  border-bottom: 1px solid var(--border-color);
  transition: background-color 0.3s ease;
}

.notification-item:hover {
  background: var(--bg-secondary);
}

.notification-item.unread {
  background: var(--accent-light);
}

.notification-icon {
  font-size: 20px;
  flex-shrink: 0;
}

.notification-content {
  flex: 1;
}

.notification-content p {
  margin: 0 0 4px 0;
  color: var(--text-primary);
}

.notification-time {
  font-size: 12px;
  color: var(--text-muted);
}

.pagination-ellipsis {
  padding: 10px 14px;
  color: var(--text-muted);
  font-size: 14px;
}

/* Grid View Styles */
.main-content.grid-view {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 20px;
}

.main-content.grid-view .question-card {
  height: fit-content;
}

/* Answered/Unanswered Status */
.stat.answered {
  color: var(--success-color);
}

.stat.unanswered {
  color: var(--warning-color);
}
`;

// Inject modal styles
const styleSheet = document.createElement("style");
styleSheet.textContent = modalStyles;
document.head.appendChild(styleSheet);
