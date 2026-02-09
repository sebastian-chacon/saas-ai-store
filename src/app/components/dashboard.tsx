import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { 
  Store, 
  Package, 
  ShoppingCart, 
  TrendingUp, 
  Users, 
  Settings,
  Eye,
  Plus,
  DollarSign,
  AlertCircle,
  Sparkles,
  Palette
} from "lucide-react";

type View = "landing" | "dashboard" | "products" | "store" | "templates";

interface DashboardProps {
  onNavigate: (view: View) => void;
}

export default function Dashboard({ onNavigate }: DashboardProps) {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-purple-950 to-slate-950">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.1),transparent_50%)]" />
        <motion.div
          className="absolute top-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8b5cf608_1px,transparent_1px),linear-gradient(to_bottom,#8b5cf608_1px,transparent_1px)] bg-size-[4rem_4rem]" />
      </div>

      {/* Header */}
      <header className="relative border-b border-white/10 backdrop-blur-xl bg-slate-900/50">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative">
              <Store className="w-7 h-7 text-purple-400" />
              <motion.div
                className="absolute inset-0 bg-purple-500/50 blur-lg"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
            <span className="text-xl font-bold bg-linear-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              MiTienda
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onNavigate("store")}
              className="border-white/20 text-white hover:bg-white/10"
            >
              <Eye className="w-4 h-4 mr-2" />
              Ver tienda
            </Button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-linear-to-r from-purple-600 to-cyan-600 flex items-center justify-center text-white text-sm font-semibold">
                MG
              </div>
              <span className="text-sm font-medium text-white">Mi Tienda Online</span>
            </div>
          </div>
        </div>
      </header>

      <div className="relative flex">
        {/* Sidebar */}
        <aside className="w-64 border-r border-white/10 min-h-[calc(100vh-65px)] backdrop-blur-xl bg-slate-900/30">
          <nav className="p-4 space-y-1">
            <a
              href="#"
              className="flex items-center gap-3 px-3 py-2 rounded-lg bg-linear-to-r from-purple-600/20 to-cyan-600/20 border border-purple-500/30 text-purple-300 font-medium"
            >
              <TrendingUp className="w-5 h-5" />
              Dashboard
            </a>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onNavigate("products");
              }}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-300 hover:bg-white/5 transition-colors"
            >
              <Package className="w-5 h-5" />
              Productos
            </a>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onNavigate("templates");
              }}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-300 hover:bg-white/5 transition-colors"
            >
              <Sparkles className="w-5 h-5" />
              Plantillas IA
            </a>
            <a
              href="#"
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-300 hover:bg-white/5 transition-colors"
            >
              <ShoppingCart className="w-5 h-5" />
              Pedidos
            </a>
            <a
              href="#"
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-300 hover:bg-white/5 transition-colors"
            >
              <Users className="w-5 h-5" />
              Clientes
            </a>
            <a
              href="#"
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-300 hover:bg-white/5 transition-colors"
            >
              <Settings className="w-5 h-5" />
              Configuración
            </a>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {/* Welcome Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-4xl font-bold text-white mb-2">
              ¡Bienvenido de nuevo! 👋
            </h1>
            <p className="text-slate-300">Aquí está el resumen de tu tienda</p>
          </motion.div>

          {/* Alert */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="mb-8 p-4 bg-linear-to-r from-amber-500/10 to-orange-500/10 border-amber-500/30 backdrop-blur-xl">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-amber-400 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-amber-100">
                    Descubre el generador de plantillas con IA
                  </p>
                  <p className="text-sm text-amber-200/80 mt-1">
                    Crea diseños únicos para tu tienda en segundos con inteligencia artificial
                  </p>
                </div>
                <Button
                  size="sm"
                  onClick={() => onNavigate("templates")}
                  className="bg-linear-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white border-0"
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Probar IA
                </Button>
              </div>
            </Card>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -4 }}
              >
                <Card className="p-6 bg-slate-900/50 backdrop-blur-xl border-white/10 hover:border-purple-500/50 transition-all group">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-lg ${stat.bgGradient} relative overflow-hidden`}>
                      <div className="absolute inset-0 bg-linear-to-br from-white/10 to-transparent" />
                      <stat.icon className="w-6 h-6 text-white relative z-10" />
                    </div>
                    <span className={`text-sm font-medium ${stat.changeColor}`}>
                      {stat.change}
                    </span>
                  </div>
                  <div className="text-3xl font-bold text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-slate-400">{stat.label}</div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Two Column Layout */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Recent Orders */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="p-6 bg-slate-900/50 backdrop-blur-xl border-white/10">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-white">Pedidos recientes</h2>
                  <Button variant="ghost" size="sm" className="text-purple-400 hover:text-purple-300 hover:bg-white/5">
                    Ver todos
                  </Button>
                </div>
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between pb-4 border-b border-white/10 last:border-0">
                      <div>
                        <div className="font-medium text-white">{order.customer}</div>
                        <div className="text-sm text-slate-400">{order.date}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-white">${order.amount}</div>
                        <span className={`text-xs px-2 py-1 rounded-full ${getStatusStyle(order.status)}`}>
                          {order.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* Top Products */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="p-6 bg-slate-900/50 backdrop-blur-xl border-white/10">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-white">Productos más vendidos</h2>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => onNavigate("products")}
                    className="text-purple-400 hover:text-purple-300 hover:bg-white/5"
                  >
                    Ver todos
                  </Button>
                </div>
                <div className="space-y-4">
                  {topProducts.map((product) => (
                    <div key={product.id} className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-linear-to-br from-purple-500/20 to-cyan-500/20 rounded-lg flex items-center justify-center border border-purple-500/30">
                        <Package className="w-6 h-6 text-purple-400" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-white">{product.name}</div>
                        <div className="text-sm text-slate-400">{product.sales} vendidos</div>
                      </div>
                      <div className="font-semibold text-white">${product.revenue}</div>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-8"
          >
            <h2 className="text-xl font-bold text-white mb-4">Acciones rápidas</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <motion.div whileHover={{ y: -4 }}>
                <Card 
                  className="p-6 bg-slate-900/50 backdrop-blur-xl border-white/10 hover:border-purple-500/50 transition-all cursor-pointer group"
                  onClick={() => onNavigate("products")}
                >
                  <div className="relative mb-3">
                    <Plus className="w-8 h-8 text-purple-400" />
                    <div className="absolute inset-0 bg-purple-500/20 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <h3 className="font-semibold text-white mb-1">Agregar producto</h3>
                  <p className="text-sm text-slate-400">Añade nuevos productos a tu catálogo</p>
                </Card>
              </motion.div>
              <motion.div whileHover={{ y: -4 }}>
                <Card 
                  className="p-6 bg-slate-900/50 backdrop-blur-xl border-white/10 hover:border-cyan-500/50 transition-all cursor-pointer group"
                  onClick={() => onNavigate("templates")}
                >
                  <div className="relative mb-3">
                    <Sparkles className="w-8 h-8 text-cyan-400" />
                    <div className="absolute inset-0 bg-cyan-500/20 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <h3 className="font-semibold text-white mb-1">Plantillas con IA</h3>
                  <p className="text-sm text-slate-400">Genera diseños únicos con inteligencia artificial</p>
                </Card>
              </motion.div>
              <motion.div whileHover={{ y: -4 }}>
                <Card 
                  className="p-6 bg-slate-900/50 backdrop-blur-xl border-white/10 hover:border-green-500/50 transition-all cursor-pointer group"
                  onClick={() => onNavigate("store")}
                >
                  <div className="relative mb-3">
                    <Palette className="w-8 h-8 text-green-400" />
                    <div className="absolute inset-0 bg-green-500/20 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <h3 className="font-semibold text-white mb-1">Personalizar tienda</h3>
                  <p className="text-sm text-slate-400">Cambia el diseño de tu tienda</p>
                </Card>
              </motion.div>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}

const stats = [
  {
    icon: DollarSign,
    value: "$12,450",
    label: "Ventas este mes",
    change: "+12.5%",
    changeColor: "text-green-400",
    bgGradient: "bg-gradient-to-br from-green-600 to-emerald-600"
  },
  {
    icon: ShoppingCart,
    value: "48",
    label: "Pedidos totales",
    change: "+8.2%",
    changeColor: "text-green-400",
    bgGradient: "bg-gradient-to-br from-blue-600 to-cyan-600"
  },
  {
    icon: Package,
    value: "24",
    label: "Productos activos",
    change: "+3",
    changeColor: "text-slate-400",
    bgGradient: "bg-gradient-to-br from-purple-600 to-pink-600"
  },
  {
    icon: Users,
    value: "156",
    label: "Clientes",
    change: "+15.3%",
    changeColor: "text-green-400",
    bgGradient: "bg-gradient-to-br from-amber-600 to-orange-600"
  }
];

const recentOrders = [
  {
    id: 1,
    customer: "Juan Pérez",
    date: "Hace 2 horas",
    amount: "450",
    status: "Pendiente"
  },
  {
    id: 2,
    customer: "María García",
    date: "Hace 5 horas",
    amount: "890",
    status: "Completado"
  },
  {
    id: 3,
    customer: "Carlos Rodríguez",
    date: "Ayer",
    amount: "1,250",
    status: "Enviado"
  },
  {
    id: 4,
    customer: "Ana Martínez",
    date: "Hace 2 días",
    amount: "675",
    status: "Completado"
  }
];

const topProducts = [
  {
    id: 1,
    name: "Zapatillas Running Pro",
    sales: 45,
    revenue: "3,375"
  },
  {
    id: 2,
    name: "Remera Deportiva",
    sales: 38,
    revenue: "1,520"
  },
  {
    id: 3,
    name: "Pantalón Jogger",
    sales: 32,
    revenue: "2,240"
  },
  {
    id: 4,
    name: "Campera Impermeable",
    sales: 28,
    revenue: "4,200"
  }
];

function getStatusStyle(status: string) {
  switch (status) {
    case "Completado":
      return "bg-green-500/20 text-green-400 border border-green-500/30";
    case "Pendiente":
      return "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30";
    case "Enviado":
      return "bg-blue-500/20 text-blue-400 border border-blue-500/30";
    default:
      return "bg-slate-500/20 text-slate-400 border border-slate-500/30";
  }
}
