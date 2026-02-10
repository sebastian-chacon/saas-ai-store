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
  Users,
  UserPlus,
  ArrowLeft,
  Search,
  Edit,
  Trash2,
  Mail,
  Phone,
  User,
  Star,
  ShoppingBag
} from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

type View = "landing" | "dashboard" | "products" | "store" | "templates" | "customers" | "orders";

interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  totalSpent: number;
  ordersCount: number;
  status: "active" | "inactive";
}

export default function CustomerManager({
  onNavigate,
}: {
  onNavigate: (view: View) => void;
}) {
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleOpenDialog = (customer?: Customer) => {
    if (customer) {
      setEditingCustomer(customer);
      setFormData({
        name: customer.name,
        email: customer.email,
        phone: customer.phone,
      });
    } else {
      setEditingCustomer(null);
      setFormData({ name: "", email: "", phone: "" });
    }
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingCustomer(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email) {
      toast.error("Datos incompletos", {
        description: "El nombre y el email son obligatorios."
      });
      return;
    }

    if (editingCustomer) {
      setCustomers(customers.map((c) => 
        c.id === editingCustomer.id ? { ...c, ...formData } : c
      ));
      toast.success("Cliente actualizado", {
        description: `${formData.name} ha sido modificado.`
      });
    } else {
      const newCustomer: Customer = {
        id: Math.max(...customers.map((c) => c.id), 0) + 1,
        ...formData,
        totalSpent: 0,
        ordersCount: 0,
        status: "active",
      };
      setCustomers([...customers, newCustomer]);
      toast.success("Cliente registrado", {
        description: "Bienvenido al sistema."
      });
    }

    handleCloseDialog();
  };

  const handleDelete = (id: number) => {
    setCustomers(customers.filter((c) => c.id !== id));
    toast.warning("Cliente eliminado", {
      description: "El registro ha sido removido."
    });
  };

  const filteredCustomers = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = [
    { label: "Total Clientes", value: customers.length, icon: Users, change: "Base de Datos", changeColor: "text-blue-400", bgGradient: "bg-linear-to-br from-blue-600 to-cyan-600" },
    { label: "Ingresos Clientes", value: `$${customers.reduce((s, c) => s + c.totalSpent, 0).toLocaleString()}`, icon: Star, change: "LTV Total", changeColor: "text-emerald-400", bgGradient: "bg-linear-to-br from-green-600 to-emerald-600" },
    { label: "Pedidos Totales", value: customers.reduce((s, c) => s + c.ordersCount, 0), icon: ShoppingBag, change: "Ventas", changeColor: "text-purple-400", bgGradient: "bg-linear-to-br from-purple-600 to-pink-600" },
    { label: "Clientes Activos", value: customers.filter(c => c.status === "active").length, icon: UserPlus, change: "Fidelidad", changeColor: "text-amber-400", bgGradient: "bg-linear-to-br from-amber-600 to-orange-600" },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 min-h-screen">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
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
            Clientes
          </h1>
          <p className="text-slate-400 mt-1">Gestiona tu base de usuarios y su actividad.</p>
        </div>
        <Button
          onClick={() => handleOpenDialog()}
          size="lg"
          className="bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 border-0 shadow-lg shadow-blue-500/20"
        >
          <UserPlus className="w-5 h-5 mr-2" />
          Nuevo Cliente
        </Button>
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
            <Card className="p-6 bg-slate-900/50 backdrop-blur-xl border-white/10 hover:border-blue-500/50 transition-all group">
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
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
        <Input
          placeholder="Buscar cliente por nombre o email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-12 bg-slate-900/40 border-white/10 backdrop-blur-md h-14 text-white focus:ring-blue-500/50 placeholder:text-slate-500"
        />
      </motion.div>

      {/* Table */}
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
                  <th className="px-6 py-4 text-sm font-semibold text-slate-300">Cliente</th>
                  <th className="px-6 py-4 text-sm font-semibold text-slate-300">Contacto</th>
                  <th className="px-6 py-4 text-sm font-semibold text-slate-300">Pedidos</th>
                  <th className="px-6 py-4 text-sm font-semibold text-slate-300">Total Gastado</th>
                  <th className="px-6 py-4 text-sm font-semibold text-slate-300 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                <AnimatePresence mode="popLayout">
                  {filteredCustomers.map((customer) => (
                    <motion.tr
                      layout
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      key={customer.id}
                      className="group hover:bg-white/2 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-linear-to-br from-blue-500/20 to-indigo-500/20 border border-white/10 flex items-center justify-center text-blue-400">
                            <User className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="font-medium text-slate-100">{customer.name}</div>
                            <div className="text-xs text-slate-500">ID: #{customer.id.toString().padStart(4, '0')}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          <div className="text-sm text-slate-300 flex items-center gap-2">
                            <Mail className="w-3 h-3 text-slate-500" /> {customer.email}
                          </div>
                          <div className="text-xs text-slate-500 flex items-center gap-2">
                            <Phone className="w-3 h-3 text-slate-500" /> {customer.phone}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-slate-300 text-sm">
                        {customer.ordersCount} compras
                      </td>
                      <td className="px-6 py-4 font-semibold text-emerald-400">
                        ${customer.totalSpent.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleOpenDialog(customer)}
                            className="hover:bg-blue-500/10 hover:text-blue-400 text-slate-400"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(customer.id)}
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

      {/* Customer Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-slate-900/95 border-white/10 text-white backdrop-blur-2xl max-w-xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold bg-linear-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
              {editingCustomer ? "Editar Cliente" : "Nuevo Cliente"}
            </DialogTitle>
            <DialogDescription className="text-slate-400">
              Registra o modifica los datos de contacto del cliente.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label className="text-slate-300">Nombre Completo *</Label>
              <Input 
                className="bg-white/5 border-white/10 text-white focus:border-blue-500/50" 
                value={formData.name} 
                onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
                placeholder="Juan Pérez" 
              />
            </div>
            <div className="space-y-2">
              <Label className="text-slate-300">Correo Electrónico *</Label>
              <Input 
                type="email"
                className="bg-white/5 border-white/10 text-white" 
                value={formData.email} 
                onChange={(e) => setFormData({ ...formData, email: e.target.value })} 
                placeholder="juan@ejemplo.com" 
              />
            </div>
            <div className="space-y-2">
              <Label className="text-slate-300">Teléfono</Label>
              <Input 
                className="bg-white/5 border-white/10 text-white" 
                value={formData.phone} 
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })} 
                placeholder="+54 11 1234 5678" 
              />
            </div>
            <DialogFooter className="pt-6">
              <Button type="button" variant="ghost" onClick={handleCloseDialog} className="text-slate-400 hover:text-white hover:bg-white/5">Cancelar</Button>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-900/20 px-8 font-semibold">
                {editingCustomer ? "Actualizar" : "Crear Cliente"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

const initialCustomers: Customer[] = [
  { id: 1, name: "Lucas Aramburu", email: "lucas@ejemplo.com", phone: "+54 11 4444 5555", totalSpent: 45000, ordersCount: 12, status: "active" },
  { id: 2, name: "Sofía Rodríguez", email: "sofia@design.com", phone: "+54 11 2222 3333", totalSpent: 12000, ordersCount: 3, status: "active" },
  { id: 3, name: "Martín Fierro", email: "martin@gaucho.com", phone: "+54 11 6666 7777", totalSpent: 0, ordersCount: 0, status: "inactive" },
];