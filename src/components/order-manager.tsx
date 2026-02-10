"use client";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  ShoppingCart,
  ArrowLeft,
  Search,
  Eye,
  Trash2,
  Clock,
  CheckCircle2,
  Truck,
  AlertCircle,
  Calendar,
  Hash
} from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

type View = "landing" | "dashboard" | "products" | "store" | "templates" | "customers" | "orders";

interface Order {
  id: string;
  customerName: string;
  date: string;
  total: number;
  status: "pending" | "shipped" | "delivered" | "cancelled";
  itemsCount: number;
}

export default function OrderManager({
  onNavigate,
}: {
  onNavigate: (view: View) => void;
}) {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const handleDelete = (id: string) => {
    setOrders(orders.filter((o) => o.id !== id));
    toast.error("Pedido eliminado", {
      description: `El pedido ${id} ha sido removido del historial.`
    });
  };

  const filteredOrders = orders.filter(
    (o) =>
      o.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusStyle = (status: Order["status"]) => {
    switch (status) {
      case "delivered": return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
      case "shipped": return "bg-blue-500/10 text-blue-400 border-blue-500/20";
      case "pending": return "bg-amber-500/10 text-amber-400 border-amber-500/20";
      case "cancelled": return "bg-rose-500/10 text-rose-400 border-rose-500/20";
    }
  };

  const stats = [
    { label: "Pedidos Hoy", value: "12", icon: ShoppingCart, change: "+4 nuevos", changeColor: "text-emerald-400", bgGradient: "bg-linear-to-br from-orange-500 to-rose-500" },
    { label: "Pendientes", value: orders.filter(o => o.status === "pending").length, icon: Clock, change: "Por enviar", changeColor: "text-amber-400", bgGradient: "bg-linear-to-br from-amber-500 to-orange-600" },
    { label: "En Camino", value: orders.filter(o => o.status === "shipped").length, icon: Truck, change: "Logística", changeColor: "text-blue-400", bgGradient: "bg-linear-to-br from-blue-500 to-indigo-600" },
    { label: "Entregados", value: orders.filter(o => o.status === "delivered").length, icon: CheckCircle2, change: "Completados", changeColor: "text-emerald-400", bgGradient: "bg-linear-to-br from-emerald-500 to-teal-600" },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 min-h-screen">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-4"
      >
        <div>
          <Button
            variant="ghost"
            size="sm"
            className="mb-2 text-slate-400 hover:text-white p-0 hover:bg-transparent"
            onClick={() => onNavigate("dashboard")}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Panel de Control
          </Button>
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-linear-to-r from-white to-slate-400">
            Pedidos
          </h1>
          <p className="text-slate-400 mt-1">Monitorea las ventas y el estado de los envíos.</p>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -4 }}
          >
            <Card className="p-6 bg-slate-900/50 backdrop-blur-xl border-white/10 hover:border-orange-500/50 transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${stat.bgGradient} relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-linear-to-br from-white/20 to-transparent" />
                  <stat.icon className="w-6 h-6 text-white relative z-10" />
                </div>
                <span className={`text-xs font-bold uppercase tracking-wider ${stat.changeColor}`}>
                  {stat.change}
                </span>
              </div>
              <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-sm text-slate-400 font-medium">{stat.label}</div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Toolbar */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
        className="relative group"
      >
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-orange-400 transition-colors" />
        <Input
          placeholder="Buscar por ID de pedido o nombre de cliente..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-12 bg-slate-900/40 border-white/10 backdrop-blur-md h-14 text-white focus:ring-orange-500/50 placeholder:text-slate-500"
        />
      </motion.div>

      {/* Orders Table */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="bg-slate-900/40 backdrop-blur-md border-white/5 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/5 bg-white/2">
                  <th className="px-6 py-4 text-sm font-semibold text-slate-300">ID Pedido</th>
                  <th className="px-6 py-4 text-sm font-semibold text-slate-300">Cliente</th>
                  <th className="px-6 py-4 text-sm font-semibold text-slate-300">Fecha</th>
                  <th className="px-6 py-4 text-sm font-semibold text-slate-300">Estado</th>
                  <th className="px-6 py-4 text-sm font-semibold text-slate-300">Total</th>
                  <th className="px-6 py-4 text-sm font-semibold text-slate-300 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                <AnimatePresence mode="popLayout">
                  {filteredOrders.map((order) => (
                    <motion.tr
                      layout
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      key={order.id}
                      className="group hover:bg-white/2 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-orange-400 font-mono text-sm">
                          <Hash className="w-3 h-3" /> {order.id}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-medium text-slate-100">{order.customerName}</div>
                        <div className="text-xs text-slate-500">{order.itemsCount} productos</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-slate-300 flex items-center gap-2">
                          <Calendar className="w-3 h-3 text-slate-500" /> {order.date}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusStyle(order.status)} uppercase tracking-tighter`}>
                          {order.status === 'pending' ? 'Pendiente' : 
                           order.status === 'shipped' ? 'Enviado' : 
                           order.status === 'delivered' ? 'Entregado' : 'Cancelado'}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-bold text-slate-100">
                        ${order.total.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setSelectedOrder(order)}
                            className="hover:bg-white/10 text-slate-400 hover:text-white"
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(order.id)}
                            className="hover:bg-rose-500/10 hover:text-rose-400 text-slate-400"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </Card>
      </motion.div>

      {/* Order Detail Dialog */}
      <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
        <DialogContent className="bg-slate-900/95 border-white/10 text-white backdrop-blur-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold flex items-center gap-2">
              <ShoppingCart className="w-6 h-6 text-orange-500" />
              Detalle del Pedido
            </DialogTitle>
          </DialogHeader>
          
          {selectedOrder && (
            <div className="space-y-6 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-xs text-slate-500 uppercase font-bold mb-1">Cliente</p>
                  <p className="text-lg font-medium">{selectedOrder.customerName}</p>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-xs text-slate-500 uppercase font-bold mb-1">ID Transacción</p>
                  <p className="text-lg font-mono text-orange-400">{selectedOrder.id}</p>
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-sm font-bold text-slate-400">Resumen de carga</p>
                <div className="flex justify-between items-center py-2 border-b border-white/5">
                  <span className="text-slate-300">Subtotal ({selectedOrder.itemsCount} items)</span>
                  <span>${selectedOrder.total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-white/5 text-emerald-400">
                  <span>Envío</span>
                  <span>Gratis</span>
                </div>
                <div className="flex justify-between items-center pt-2 text-xl font-bold">
                  <span>Total</span>
                  <span className="text-orange-500">${selectedOrder.total.toLocaleString()}</span>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button onClick={() => setSelectedOrder(null)} className="w-full bg-orange-600 hover:bg-orange-500">
              Cerrar Detalle
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

const initialOrders: Order[] = [
  { id: "ORD-7721", customerName: "Lucas Aramburu", date: "09/02/2026", total: 25900, status: "pending", itemsCount: 3 },
  { id: "ORD-8842", customerName: "Sofía Rodríguez", date: "08/02/2026", total: 12500, status: "shipped", itemsCount: 1 },
  { id: "ORD-9910", customerName: "Martín Fierro", date: "07/02/2026", total: 45000, status: "delivered", itemsCount: 5 },
  { id: "ORD-1120", customerName: "Elena White", date: "05/02/2026", total: 8900, status: "cancelled", itemsCount: 2 },
];