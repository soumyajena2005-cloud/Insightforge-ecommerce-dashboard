import React, { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area, PieChart, Pie, Cell, LineChart, Line, Legend 
} from 'recharts';
import { 
  LayoutDashboard, Users, Package, MapPin, Code2, TrendingUp, 
  DollarSign, ShoppingCart, Percent, ArrowUpRight, ArrowDownRight,
  Menu, X, Download, FileText, Search
} from 'lucide-react';
import { cn } from './lib/utils';
import { mockData, codeSnippets } from './data/mockData';
import ReactMarkdown from 'react-markdown';

// --- Components ---

const StatCard = ({ title, value, change, icon: Icon, color }: any) => (
  <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-slate-400 text-sm font-medium mb-1">{title}</p>
        <h3 className="text-2xl font-bold text-white mb-2">{value}</h3>
        <div className={cn(
          "flex items-center text-xs font-medium",
          change >= 0 ? "text-emerald-400" : "text-rose-400"
        )}>
          {change >= 0 ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
          {Math.abs(change)}% from last month
        </div>
      </div>
      <div className={cn("p-3 rounded-xl", color)}>
        <Icon className="w-6 h-6 text-white" />
      </div>
    </div>
  </div>
);

const ChartContainer = ({ title, children, className }: any) => (
  <div className={cn("bg-slate-900/50 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm", className)}>
    <h3 className="text-lg font-semibold text-white mb-6">{title}</h3>
    <div className="h-[300px] w-full">
      {children}
    </div>
  </div>
);

// --- Main App ---

export default function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 flex font-sans selection:bg-blue-500/30">
      
      {/* Sidebar */}
      <aside className={cn(
        "fixed lg:static inset-y-0 left-0 z-50 w-64 bg-slate-950 border-r border-slate-900 transition-transform duration-300 transform",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        
        <div className="p-6">
          
          {/* Logo */}
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
              <TrendingUp className="text-white" />
            </div>

            <h1 className="text-xl font-bold text-white tracking-tight uppercase">
              Insight <span className="text-blue-500">Forge</span>
            </h1>
          </div>

          {/* Navigation */}
          <nav className="space-y-1">
            {[
              { id: 'overview', icon: LayoutDashboard, label: 'Overview' },
              { id: 'customers', icon: Users, label: 'Customers' },
              { id: 'products', icon: Package, label: 'Products' },
              { id: 'regional', icon: MapPin, label: 'Regional' },
              { id: 'scripts', icon: Code2, label: 'Analysis Scripts' },
            ].map(item => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium",
                  activeTab === item.id 
                    ? "bg-blue-600/10 text-blue-400 border border-blue-600/20" 
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"
                )}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Profile Card */}
        <div className="absolute bottom-0 w-full p-6 border-t border-slate-900">
          <div className="bg-slate-900/50 rounded-xl p-4 flex items-center gap-3">
            
            <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-blue-400">
              SJ
            </div>

            <div>
              <p className="text-sm font-semibold text-white">
                Soumya Ranjan Jena
              </p>

              <p className="text-xs text-slate-500">
                Data Analytics & BI Developer
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        
        {/* Header */}
        <header className="h-20 border-b border-slate-900 flex items-center justify-between px-8 bg-slate-950/50 backdrop-blur-md sticky top-0 z-40">
          
          <div className="flex items-center gap-4">
            
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
              className="lg:hidden p-2 text-slate-400 hover:text-white"
            >
              {isSidebarOpen ? <X /> : <Menu />}
            </button>

            <h2 className="text-xl font-semibold text-white capitalize">
              InsightForge {activeTab} Dashboard
            </h2>
          </div>
          
          <div className="flex items-center gap-4">
            
            <div className="hidden md:flex relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              
              <input 
                type="text" 
                placeholder="Search metrics..." 
                className="bg-slate-900 border border-slate-800 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all w-64"
              />
            </div>

            <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-all">
              <Download className="w-4 h-4" />
              Export Report
            </button>
          </div>
        </header>

        {/* Content */}
        <div className="p-8 pb-32 max-w-7xl mx-auto">

          {activeTab === 'overview' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">

              {/* KPI Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                
                <StatCard 
                  title="Total Revenue" 
                  value={formatCurrency(mockData.kpis.totalSales)} 
                  change={12.4} 
                  icon={DollarSign} 
                  color="bg-blue-500/20" 
                />

                <StatCard 
                  title="Total Orders" 
                  value={mockData.kpis.totalOrders.toLocaleString()} 
                  change={8.2} 
                  icon={ShoppingCart} 
                  color="bg-emerald-500/20" 
                />

                <StatCard 
                  title="Total Profit" 
                  value={formatCurrency(mockData.kpis.totalProfit)} 
                  change={-2.1} 
                  icon={TrendingUp} 
                  color="bg-purple-500/20" 
                />

                <StatCard 
                  title="Profit Margin" 
                  value={`${mockData.kpis.profitMargin}%`} 
                  change={0.5} 
                  icon={Percent} 
                  color="bg-orange-500/20" 
                />
              </div>

              {/* Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                <ChartContainer title="Revenue vs Profit Trend" className="lg:col-span-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={mockData.salesTrend}>

                      <defs>
                        <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                        </linearGradient>
                      </defs>

                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />

                      <XAxis 
                        dataKey="month" 
                        stroke="#64748b" 
                        fontSize={12} 
                        tickLine={false} 
                        axisLine={false} 
                      />

                      <YAxis 
                        stroke="#64748b" 
                        fontSize={12} 
                        tickLine={false} 
                        axisLine={false} 
                        tickFormatter={(val) => `$${val/1000}k`} 
                      />

                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#0f172a', 
                          border: '1px solid #1e293b', 
                          borderRadius: '12px' 
                        }}
                      />

                      <Area 
                        type="monotone" 
                        dataKey="sales" 
                        stroke="#3b82f6" 
                        fillOpacity={1} 
                        fill="url(#colorSales)" 
                        strokeWidth={3} 
                      />

                      <Area 
                        type="monotone" 
                        dataKey="profit" 
                        stroke="#10b981" 
                        fill="none" 
                        strokeWidth={2} 
                        strokeDasharray="5 5" 
                      />

                    </AreaChart>
                  </ResponsiveContainer>
                </ChartContainer>

                <ChartContainer title="Sales by Category">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>

                      <Pie
                        data={mockData.categoryPerformance}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="sales"
                      >
                        {mockData.categoryPerformance.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>

                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#0f172a', 
                          border: '1px solid #1e293b', 
                          borderRadius: '12px' 
                        }}
                      />

                      <Legend verticalAlign="bottom" height={36}/>

                    </PieChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>

              {/* Executive Insights */}
              <div className="bg-blue-600/5 border border-blue-600/20 rounded-2xl p-6">
                
                <div className="flex items-center gap-3 mb-4">
                  <FileText className="text-blue-500" />
                  <h4 className="text-white font-semibold">Executive Insights</h4>
                </div>

                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  
                  <li className="flex gap-2 text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                    Q4 sales performance showed a significant increase due to seasonal demand and improved customer retention trends.
                  </li>

                  <li className="flex gap-2 text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                    Technology and Office Supplies categories contributed the highest revenue growth across all product segments.
                  </li>

                </ul>
              </div>
            </div>
                  )}

          {activeTab === 'customers' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                <ChartContainer title="Customer Segment Distribution">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={mockData.segmentDist}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
                      <XAxis dataKey="name" stroke="#64748b" />
                      <YAxis stroke="#64748b" />
                      <Tooltip />
                      <Bar dataKey="value" fill="#3b82f6" radius={[4,4,0,0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>

                <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-6">
                    Top Customers by Revenue
                  </h3>

                  <div className="space-y-4">
                    {mockData.topCustomers.map((customer, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-4 bg-slate-800/40 rounded-xl"
                      >
                        <div>
                          <p className="text-white font-semibold">
                            {customer.name}
                          </p>

                          <p className="text-slate-400 text-sm">
                            {customer.orders} Orders
                          </p>
                        </div>

                        <div className="text-right">
                          <p className="text-white font-bold">
                            {formatCurrency(customer.spend)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'products' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">

              <ChartContainer title="Profitability by Category" className="!h-[500px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart layout="vertical" data={mockData.categoryPerformance}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#1e293b" />
                    <XAxis type="number" stroke="#64748b" />
                    <YAxis dataKey="category" type="category" stroke="#64748b" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="sales" fill="#3b82f6" radius={[0,4,4,0]} />
                    <Bar dataKey="profit" fill="#10b981" radius={[0,4,4,0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>

            </div>
          )}

          {activeTab === 'regional' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                <ChartContainer title="Revenue by Region">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={mockData.regionalPerformance}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
                      <XAxis dataKey="region" stroke="#64748b" />
                      <YAxis stroke="#64748b" />
                      <Tooltip />
                      <Bar dataKey="sales" fill="#6366f1" radius={[4,4,0,0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>

                <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 flex flex-col justify-center items-center text-center">

                  <MapPin className="w-16 h-16 text-slate-700 mb-6" />

                  <h3 className="text-xl font-bold text-white mb-2">
                    Regional Analytics Insights
                  </h3>

                  <p className="text-slate-400">
                    West and Central regions generated the highest revenue growth across all territories.
                  </p>

                </div>
              </div>
            </div>
          )}

          {activeTab === 'scripts' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">

              <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden">

                <div className="px-6 py-4 bg-slate-900">
                  <span className="text-white font-semibold">
                    analysis.sql
                  </span>
                </div>

                <pre className="p-6 overflow-x-auto text-sm text-blue-300 font-mono">
                  <code>{codeSnippets.sql}</code>
                </pre>
              </div>

              <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden">

                <div className="px-6 py-4 bg-slate-900">
                  <span className="text-white font-semibold">
                    preprocessing.py
                  </span>
                </div>

                <pre className="p-6 overflow-x-auto text-sm text-emerald-400 font-mono">
                  <code>{codeSnippets.python}</code>
                </pre>
              </div>

            </div>
          )}

        </div>
      </main>
    </div>
  );
}