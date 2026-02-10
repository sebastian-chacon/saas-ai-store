'use client'
import { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import {
  Store,
  Search,
  ShoppingCart,
  Heart,
  User,
  ArrowLeft,
  ShoppingBag,
  Truck,
  Shield,
  RefreshCw,
  Star
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { toast } from "sonner";

type View = "landing" | "dashboard" | "products" | "store" | "templates";

interface StorePreviewProps {
  onNavigate: (view: View) => void;
}

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
}

export default function StorePreview({ onNavigate }: StorePreviewProps) {
  const [cart, setCart] = useState<number[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("Todos");

  const addToCart = (productId: number) => {
    setCart([...cart, productId]);
    toast.success("Producto agregado al carrito");
  };

  const filteredProducts = selectedCategory === "Todos" 
    ? storeProducts 
    : storeProducts.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-white">
      {/* Admin Bar */}
      <div className="bg-gray-900 text-white px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm">
          <Store className="w-4 h-4" />
          <span>Vista previa de la tienda</span>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-white hover:text-gray-200"
            onClick={() => onNavigate("dashboard")}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver al admin
          </Button>
        </div>
      </div>

      {/* Store Header */}
      <header className="border-b sticky top-0 bg-white z-50">
        <div className="container mx-auto px-4">
          {/* Top Bar */}
          <div className="flex items-center justify-between py-3 border-b">
            <div className="flex items-center gap-6 text-sm text-gray-600">
              <span>📞 +54 11 1234-5678</span>
              <span>📧 info@mitienda.com</span>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <a href="#" className="text-gray-600 hover:text-gray-900">Ayuda</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">Seguimiento</a>
            </div>
          </div>

          {/* Main Header */}
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-2">
              <Store className="w-8 h-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">Mi Tienda Online</span>
            </div>

            {/* Search */}
            <div className="flex-1 max-w-2xl mx-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  placeholder="Buscar productos..."
                  className="pl-12 pr-4 h-12"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm">
                <User className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="sm">
                <Heart className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="sm" className="relative">
                <ShoppingCart className="w-5 h-5" />
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cart.length}
                  </span>
                )}
              </Button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex items-center gap-8 py-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? "text-blue-600"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {category}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Hero Banner */}
      <section className="bg-linear-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            <Badge className="mb-4 bg-white text-blue-600">Nueva Colección</Badge>
            <h1 className="text-5xl font-bold mb-4">
              Temporada 2026
            </h1>
            <p className="text-xl mb-8 text-blue-100">
              Descubrí las últimas tendencias en deportes y estilo de vida. Hasta 30% OFF en productos seleccionados.
            </p>
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              <ShoppingBag className="w-5 h-5 mr-2" />
              Comprar ahora
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-y bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-full">
                <Truck className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <div className="font-semibold text-gray-900">Envío gratis</div>
                <div className="text-sm text-gray-600">En compras mayores a $50.000</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-full">
                <Shield className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <div className="font-semibold text-gray-900">Compra segura</div>
                <div className="text-sm text-gray-600">Protección al comprador</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 rounded-full">
                <RefreshCw className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <div className="font-semibold text-gray-900">Devoluciones fáciles</div>
                <div className="text-sm text-gray-600">30 días para cambios</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {selectedCategory === "Todos" ? "Todos los productos" : selectedCategory}
              </h2>
              <p className="text-gray-600">
                {filteredProducts.length} productos disponibles
              </p>
            </div>
            <select className="border rounded-lg px-4 py-2 text-sm">
              <option>Más relevantes</option>
              <option>Menor precio</option>
              <option>Mayor precio</option>
              <option>Más vendidos</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="group overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative overflow-hidden">
                  <ImageWithFallback
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {product.originalPrice && (
                    <Badge className="absolute top-3 left-3 bg-red-600">
                      -{Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                    </Badge>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-3 right-3 bg-white hover:bg-gray-100 rounded-full w-9 h-9 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Heart className="w-4 h-4" />
                  </Button>
                </div>
                <div className="p-4">
                  <div className="text-sm text-gray-500 mb-1">{product.category}</div>
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < product.rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                    <span className="text-sm text-gray-500 ml-1">
                      ({product.reviews})
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-2xl font-bold text-gray-900">
                      ${product.price.toLocaleString()}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">
                        ${product.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                  <Button 
                    className="w-full"
                    onClick={() => addToCart(product.id)}
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Agregar
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Suscribite a nuestro newsletter
          </h2>
          <p className="text-gray-300 mb-8 max-w-xl mx-auto">
            Recibí ofertas exclusivas, lanzamientos y novedades directamente en tu email
          </p>
          <div className="flex gap-3 max-w-md mx-auto">
            <Input
              placeholder="Tu email"
              className="bg-white"
            />
            <Button className="bg-blue-600 hover:bg-blue-700">
              Suscribirme
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 text-black py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Store className="w-6 h-6 text-blue-600" />
                <span className="text-xl font-bold">Mi Tienda Online</span>
              </div>
              <p className="text-sm text-gray-600">
                Tu tienda de confianza para productos de calidad
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Comprar</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-gray-900">Deportes</a></li>
                <li><a href="#" className="hover:text-gray-900">Ropa</a></li>
                <li><a href="#" className="hover:text-gray-900">Accesorios</a></li>
                <li><a href="#" className="hover:text-gray-900">Electrónica</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Ayuda</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-gray-900">Envíos</a></li>
                <li><a href="#" className="hover:text-gray-900">Devoluciones</a></li>
                <li><a href="#" className="hover:text-gray-900">Preguntas frecuentes</a></li>
                <li><a href="#" className="hover:text-gray-900">Contacto</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Sobre nosotros</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-gray-900">Nuestra historia</a></li>
                <li><a href="#" className="hover:text-gray-900">Trabaja con nosotros</a></li>
                <li><a href="#" className="hover:text-gray-900">Términos y condiciones</a></li>
                <li><a href="#" className="hover:text-gray-900">Privacidad</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t pt-8 text-center text-sm text-gray-600">
            © 2026 Mi Tienda Online. Todos los derechos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
}

const categories = ["Todos", "Deportes", "Ropa", "Accesorios", "Electrónica"];

const storeProducts: Product[] = [
  {
    id: 1,
    name: "Zapatillas Running Pro",
    description: "Zapatillas profesionales para running con tecnología de amortiguación",
    price: 12990,
    originalPrice: 16990,
    image: "https://images.unsplash.com/photo-1695459468644-717c8ae17eed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxydW5uaW5nJTIwc2hvZXMlMjBzbmVha2Vyc3xlbnwxfHx8fDE3NzA0ODg2MzZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Deportes",
    rating: 5,
    reviews: 128
  },
  {
    id: 2,
    name: "Remera Deportiva Premium",
    description: "Remera técnica de alto rendimiento con tecnología dry-fit",
    price: 3990,
    image: "https://images.unsplash.com/photo-1718731236356-3b984904ac7d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcG9ydHMlMjB0LXNoaXJ0fGVufDF8fHx8MTc3MDU3MTk2N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Deportes",
    rating: 4,
    reviews: 89
  },
  {
    id: 3,
    name: "Pantalón Jogger Comfort",
    description: "Pantalón cómodo ideal para entrenar y uso casual",
    price: 6990,
    originalPrice: 8990,
    image: "https://images.unsplash.com/photo-1552902875-9ac1f9fe0c07?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqb2dnZXIlMjBwYW50c3xlbnwxfHx8fDE3NzA1NzE5Njd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Ropa",
    rating: 5,
    reviews: 64
  },
  {
    id: 4,
    name: "Campera Impermeable",
    description: "Campera técnica perfecta para días lluviosos y viento",
    price: 15990,
    image: "https://images.unsplash.com/photo-1655972670403-243839675e06?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyYWluJTIwamFja2V0fGVufDF8fHx8MTc3MDU3MTk2N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Ropa",
    rating: 5,
    reviews: 156
  },
  {
    id: 5,
    name: "Mochila Urbana 30L",
    description: "Mochila resistente con compartimento acolchado para laptop",
    price: 8990,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
    category: "Accesorios",
    rating: 4,
    reviews: 92
  },
  {
    id: 6,
    name: "Auriculares Bluetooth",
    description: "Audio premium con cancelación de ruido y 30h de batería",
    price: 9990,
    originalPrice: 14990,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
    category: "Electrónica",
    rating: 5,
    reviews: 203
  },
  {
    id: 7,
    name: "Gorra Deportiva",
    description: "Gorra ajustable con protección UV",
    price: 2490,
    image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400&h=400&fit=crop",
    category: "Accesorios",
    rating: 4,
    reviews: 45
  },
  {
    id: 8,
    name: "Botella Térmica 750ml",
    description: "Mantiene bebidas frías por 24h y calientes por 12h",
    price: 4990,
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=400&fit=crop",
    category: "Accesorios",
    rating: 5,
    reviews: 178
  }
];