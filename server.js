const express = require('express');
const path = require('path');
const net = require('net');

const app = express();
const DEFAULT_PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// ========== HARDCODED DATA ==========
const dashboardData = {
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
      { user: 'Ayesha Siddiqui', action: 'purchased', item: 'AI Chatbot Integration', time: '2 hours ago', amount: 199 },
      { user: 'Bilal Ahmed', action: 'commented', item: 'DevOps Automation Suite', time: '3 hours ago' }
    ]
  },
  recentTransactions: [
    { id: 'TXN-001', customer: 'Ahmad Khan', amount: 299, date: '2024-01-15', status: 'completed' },
    { id: 'TXN-002', customer: 'Sarah Johnson', amount: 499, date: '2024-01-14', status: 'completed' },
    { id: 'TXN-003', customer: 'Mike Chen', amount: 199, date: '2024-01-14', status: 'pending' },
    { id: 'TXN-004', customer: 'Emma Wilson', amount: 149, date: '2024-01-13', status: 'completed' },
    { id: 'TXN-005', customer: 'David Brown', amount: 399, date: '2024-01-13', status: 'failed' }
  ], // ✅ COMMA ADDED HERE
  notifications: [ // ✅ NOW INSIDE dashboardData
    { id: 1, title: 'New Order', message: 'Ahmad Khan purchased SaaS Starter Kit for $299', time: '2 min ago', read: false, icon: 'fa-shopping-bag', color: 'green' },
    { id: 2, title: 'New Review', message: 'Fatima Ali gave 5-star rating to E-commerce Pro', time: '15 min ago', read: false, icon: 'fa-star', color: 'yellow' },
    { id: 3, title: 'System Update', message: 'Platform updated to v2.5.0 with new features', time: '1 hour ago', read: true, icon: 'fa-sync', color: 'blue' },
    { id: 4, title: 'Low Stock', message: 'Mobile App Template inventory running low', time: '3 hours ago', read: false, icon: 'fa-exclamation-triangle', color: 'red' },
    { id: 5, title: 'New Message', message: 'You have a new message from support team', time: '5 hours ago', read: true, icon: 'fa-envelope', color: 'purple' }
  ] // ✅ NO COMMA NEEDED (last property)
}; // ✅ PROPERLY CLOSED
// ========== AUTO PORT FINDER FUNCTION ==========
function findFreePort(startPort) {
  return new Promise((resolve, reject) => {
    const server = net.createServer();
    server.listen(startPort, () => {
      const port = server.address().port;
      server.close(() => resolve(port));
    });
    server.on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        findFreePort(startPort + 1).then(resolve, reject);
      } else {
        reject(err);
      }
    });
  });
}

// ========== ROUTES ==========
app.get('/', (req, res) => {
  res.render('dashboard', {
    title: 'Dashboard',
    unreadCount: 3,
    stats: dashboardData.stats,
    charts: dashboardData.charts,
    recentTransactions: dashboardData.recentTransactions
  });
});

app.get('/about', (req, res) => {
  res.render('about', { 
    title: 'About Us',
    team: [
      { name: 'Ahmad Ansari', role: 'CEO', image: 'https://ui-avatars.com/api/?name=Ahmad+Ansari&background=0D8ABC&color=fff', bio: 'Founder' },
      { name: 'Fatima Zahra', role: 'Designer', image: 'https://ui-avatars.com/api/?name=Fatima+Zahra&background=E91E63&color=fff', bio: 'Creative Director' }
    ]
  });
});

app.get('/contact', (req, res) => {
  res.render('contact', { title: 'Contact Us' });
});

app.get('/api/data', (req, res) => {
  res.json(dashboardData);
});

app.get('/health', (req, res) => {
  res.json({ status: 'OK', time: new Date().toISOString() });
});

app.use((req, res) => {
  res.status(404).send('Page Not Found');
});

// ========== START SERVER ==========
findFreePort(DEFAULT_PORT)
  .then(port => {
    app.listen(port, () => {
      console.log(`🚀 Server running on http://localhost:${port}`);
      console.log(`📊 Dashboard: http://localhost:${port}/`);
      console.log(`🔌 API: http://localhost:${port}/api/data`);
    });
  })
  .catch(err => {
    console.error('❌ Failed to start server:', err);
  });
