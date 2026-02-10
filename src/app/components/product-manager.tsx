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
import { Textarea } from "./ui/textarea";
import {
  Package,
  TrendingUp,
  ArrowLeft,
  Plus,
  Search,
  Edit,
  Trash2,
  DollarSign,
  Box,
} from "lucide-react";
import { toast } from "sonner"; // Usamos la función toast que alimentará a tu Toaster personalizado
import { motion, AnimatePresence } from "framer-motion";

type View = "landing" | "dashboard" | "products" | "store" | "templates";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  status: "active" | "inactive";
}

export default function ProductManager({
  onNavigate,
}: {
  onNavigate: (view: View) => void;
}) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
  });

  const handleOpenDialog = (product?: Product) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        name: product.name,
        description: product.description,
        price: product.price.toString(),
        stock: product.stock.toString(),
        category: product.category,
      });
    } else {
      setEditingProduct(null);
      setFormData({ name: "", description: "", price: "", stock: "", category: "" });
    }
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingProduct(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.price || !formData.stock) {
      toast.error("Campos obligatorios faltantes", {
        description: "Por favor completa el nombre, precio y stock."
      });
      return;
    }

    const productData = {
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock),
      category: formData.category,
      status: "active" as const,
    };

    if (editingProduct) {
      setProducts(products.map((p) => p.id === editingProduct.id ? { ...productData, id: p.id } : p));
      toast.success("Producto actualizado", {
        description: `${formData.name} se ha modificado correctamente.`
      });
    } else {
      const newProduct = {
        ...productData,
        id: Math.max(...products.map((p) => p.id), 0) + 1,
      };
      setProducts([...products, newProduct]);
      toast.success("Producto creado", {
        description: "El nuevo artículo ya está en tu inventario."
      });
    }

    handleCloseDialog();
  };

  const handleDelete = (id: number) => {
    // En lugar de window.confirm, Sonner permite crear toasts de confirmación, 
    // pero aquí lo mantendremos simple con la lógica de estado:
    setProducts(products.filter((p) => p.id !== id));
    toast.warning("Producto eliminado", {
      description: "El cambio se ha aplicado permanentemente."
    });
  };

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = [
    { label: "Total Productos", value: products.length, icon: Package, change: "Catálogo", changeColor: "text-blue-400", bgGradient: "bg-linear-to-br from-blue-600 to-cyan-600" },
    { label: "Valor Total", value: `$${products.reduce((s, p) => s + p.price * p.stock, 0).toLocaleString()}`, icon: DollarSign, change: "Inventario", changeColor: "text-emerald-400", bgGradient: "bg-linear-to-br from-green-600 to-emerald-600" },
    { label: "Stock Global", value: products.reduce((s, p) => s + p.stock, 0), icon: Box, change: "Unidades", changeColor: "text-purple-400", bgGradient: "bg-linear-to-br from-purple-600 to-pink-600" },
    { label: "Bajo Stock", value: products.filter((p) => p.stock < 10).length, icon: TrendingUp, change: "Crítico", changeColor: "text-rose-400", bgGradient: "bg-linear-to-br from-amber-600 to-orange-600" },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 min-h-screen">
      {/* Header Section */}
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
            Inventario
          </h1>
          <p className="text-slate-400 mt-1">Gestiona y optimiza tu catálogo de productos.</p>
        </div>
        <Button
          onClick={() => handleOpenDialog()}
          size="lg"
          className="bg-linear-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 border-0 shadow-lg shadow-purple-500/20"
        >
          <Plus className="w-5 h-5 mr-2" />
          Nuevo Producto
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
            <Card className="p-6 bg-slate-900/50 backdrop-blur-xl border-white/10 hover:border-purple-500/50 transition-all group">
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

      {/* Toolbar / Search */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
        className="relative group"
      >
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-purple-400 transition-colors" />
        <Input
          placeholder="Filtrar por nombre o categoría..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-12 bg-slate-900/40 border-white/10 backdrop-blur-md h-14 text-white focus:ring-purple-500/50 placeholder:text-slate-500"
        />
      </motion.div>

      {/* Table Section */}
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
                  <th className="px-6 py-4 text-sm font-semibold text-slate-300">Producto</th>
                  <th className="px-6 py-4 text-sm font-semibold text-slate-300">Categoría</th>
                  <th className="px-6 py-4 text-sm font-semibold text-slate-300">Precio</th>
                  <th className="px-6 py-4 text-sm font-semibold text-slate-300">Stock</th>
                  <th className="px-6 py-4 text-sm font-semibold text-slate-300 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                <AnimatePresence mode="popLayout">
                  {filteredProducts.map((product) => (
                    <motion.tr
                      layout
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      key={product.id}
                      className="group hover:bg-white/2 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-lg bg-linear-to-br from-purple-500/20 to-cyan-500/20 border border-white/10 flex items-center justify-center text-purple-400">
                            <Package className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="font-medium text-slate-100">{product.name}</div>
                            <div className="text-xs text-slate-500 line-clamp-1">{product.description || "Sin descripción"}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-slate-400 text-sm">{product.category}</td>
                      <td className="px-6 py-4 font-semibold text-slate-100">${product.price.toLocaleString()}</td>
                      <td className="px-6 py-4">
                        <span className={`text-sm ${product.stock < 10 ? "text-rose-400 font-bold" : "text-slate-300"}`}>
                          {product.stock} uds.
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleOpenDialog(product)}
                            className="hover:bg-purple-500/10 hover:text-purple-400 text-slate-400"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(product.id)}
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
            {filteredProducts.length === 0 && (
              <div className="text-center py-20">
                <Package className="w-12 h-12 text-slate-600 mx-auto mb-4 opacity-20" />
                <p className="text-slate-500 font-medium">No se encontraron productos en el inventario</p>
              </div>
            )}
          </div>
        </Card>
      </motion.div>

      {/* Dialog con Estilo Unificado */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-slate-900/95 border-white/10 text-white backdrop-blur-2xl max-w-xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold bg-linear-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              {editingProduct ? "Editar producto" : "Agregar nuevo producto"}
            </DialogTitle>
            <DialogDescription className="text-slate-400">
              {editingProduct ? "Actualiza la información técnica." : "Define las características del nuevo artículo."}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-slate-300">Nombre del producto *</Label>
              <Input id="name" className="bg-white/5 border-white/10 text-white focus:border-purple-500/50 transition-colors" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Ej: Zapatillas Running Pro" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price" className="text-slate-300">Precio ($) *</Label>
                <Input id="price" type="number" step="0.01" className="bg-white/5 border-white/10 text-white" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} placeholder="0.00" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="stock" className="text-slate-300">Stock Inicial *</Label>
                <Input id="stock" type="number" className="bg-white/5 border-white/10 text-white" value={formData.stock} onChange={(e) => setFormData({ ...formData, stock: e.target.value })} placeholder="0" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="category" className="text-slate-300">Categoría</Label>
              <Input id="category" className="bg-white/5 border-white/10 text-white" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} placeholder="Ej: Deportes, Electrónica" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description" className="text-slate-300">Descripción</Label>
              <Textarea id="description" className="bg-white/5 border-white/10 text-white resize-none" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} placeholder="Detalles del producto..." rows={3} />
            </div>
            <DialogFooter className="pt-6">
              <Button type="button" variant="ghost" onClick={handleCloseDialog} className="text-slate-400 hover:text-white hover:bg-white/5">Cancelar</Button>
              <Button type="submit" className="bg-purple-600 hover:bg-purple-500 shadow-lg shadow-purple-900/20 px-8 font-semibold">
                {editingProduct ? "Guardar Cambios" : "Crear Producto"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

const initialProducts: Product[] = [
  { id: 1, name: "Zapatillas Running Pro", description: "Zapatillas profesionales de alto impacto", price: 12990, stock: 45, category: "Deportes", status: "active" },
  { id: 2, name: "Auriculares Bluetooth", description: "Cancelación de ruido activa y 40h de batería", price: 9990, stock: 28, category: "Electrónica", status: "active" },
  { id: 3, name: "Remera Técnica", description: "Tela respirable para entrenamiento intenso", price: 3990, stock: 5, category: "Deportes", status: "active" },
];