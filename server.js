const express = require('express');
const path = require('path');
const fs = require('fs').promises;

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Helper: Load mock data
async function loadData(filename) {
  try {
    const data = await fs.readFile(path.join(__dirname, 'data', filename), 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error loading ${filename}:`, error);
    return null;
  }
}

// ========== ROUTES ==========

// Home/Dashboard Route
app.get('/', async (req, res) => {
  // Load data from JSON files (agar hain to)
  const analytics = await loadData('analytics.json') || getDefaultData();
  
  res.render('dashboard', {
    title: 'Dashboard',
    unreadCount: 3,
    stats: analytics.stats,
    charts: analytics.charts,
    recentTransactions: analytics.recentTransactions || []
  });
});

// About Page
app.get('/about', (req, res) => {
  res.render('about', { title: 'About Us' });
});

// Contact Page  
app.get('/contact', (req, res) => {
  res.render('contact', { title: 'Contact Us' });
});

// API Endpoints
app.get('/api/stats', async (req, res) => {
  const data = await loadData('analytics.json') || getDefaultData();
  res.json(data);
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', time: new Date().toISOString() });
});

// Default data function (agar JSON file na ho)
function getDefaultData() {
  return {
    stats: {
      revenue: { current: 45231, growth: 26.8 },
      users: { current: 2350, growth: 11.9 },
      orders: { current: 1224, growth: 24.9 },
      products: { current: 89, growth: 17.1 }
    },
    charts: {
      revenueChart: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        data: [12000, 19000, 15000, 25000, 22000, 30000, 28000, 35000, 32000, 38000, 42000, 45231]
      },
      trafficSources: {
        labels: ['Direct', 'Social', 'Organic', 'Referral', 'Email'],
        data: [35, 25, 20, 15, 5],
        colors: ['#3B82F6', '#8B5CF6', '#10B981', '#F59E0B', '#EF4444']
      },
      recentActivity: [
        { user: 'Ahmad Khan', action: 'purchased', item: 'SaaS Starter Kit', time: '2 minutes ago', amount: 299 },
        { user: 'Fatima Ali', action: 'reviewed', item: 'E-commerce Pro', time: '15 minutes ago', rating: 5 },
        { user: 'Muhammad Usman', action: 'downloaded', item: 'Mobile App Template', time: '1 hour ago' },
        { user: 'Ayesha Siddiqui', action: 'purchased', item: 'AI Chatbot Integration', time: '2 hours ago', amount: 199 }
      ]
    },
    recentTransactions: [
      { id: 'TXN-001', customer: 'Ahmad Khan', amount: 299, date: '2024-01-15', status: 'completed' },
      { id: 'TXN-002', customer: 'Sarah Johnson', amount: 499, date: '2024-01-14', status: 'completed' },
      { id: 'TXN-003', customer: 'Mike Chen', amount: 199, date: '2024-01-14', status: 'pending' },
      { id: 'TXN-004', customer: 'Emma Wilson', amount: 149, date: '2024-01-13', status: 'completed' }
    ]
  };
}

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 Dashboard: http://localhost:${PORT}/`);
  console.log(`🔌 API: http://localhost:${PORT}/api/stats`);
});
