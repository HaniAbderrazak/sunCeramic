import { Component, OnInit, AfterViewInit, Renderer2, Inject, HostListener, OnDestroy } from '@angular/core';
import { DOCUMENT } from '@angular/common';

declare const L: any;

@Component({
  selector: 'app-sun-ceramic',
  templateUrl: './sun-ceramic.component.html',
  styleUrls: ['./sun-ceramic.component.scss']
})
export class SunCeramicComponent implements OnInit, AfterViewInit, OnDestroy {
  currentLang: string = 'en';
  isDarkMode: boolean = false;
  private map: any;
  private isMapInitialized = false;
  
  // Language menu state
  showLanguageMenu: boolean = false;
  
  // Translations
  translations: any = {
    en: {
      badge: '✨ Artisanal Excellence Since 1985',
      title: 'Handcrafted Ceramic Art for Garden & Kitchen',
      description: 'Experience the beauty of authentic craftsmanship with our handmade ceramic collections. Each piece tells a story of tradition, creativity, and sustainable artistry.',
      export: 'Countries',
      artisans: 'Artisans',
      satisfaction: 'Satisfaction',
      garden: 'Garden Collection',
   gardenDesc: 'Weather-resistant ceramic pots and planters for stunning exterior and interior spaces',      kitchen: 'Kitchen Elements',
      kitchenDesc: 'Elegant ceramic cookware, plates, and decorative kitchen accessories',
      global: 'Global Reach',
      globalDesc: 'Export & import operations across 5 continents with premium logistics',
      sustainable: 'Sustainable Craft',
      sustainableDesc: 'Eco-friendly materials and traditional techniques passed for generations',
      contactTitle: 'Connect With Us',
      address: 'Near Hospital Moknine, Moknine 5050, Tunisia',
      phone: '+216 22 241 363',
      email: 'mohamedkhmis101@gmail.com',
      footer: 'Handcrafted ceramics with love and tradition',
      exportStat: '35+',
      artisansStat: '48',
      satisfactionStat: '99%',
      exploreBtn: 'Explore Collection',
      ourCollections: 'Our Collections',
      catalog: 'View Catalog'
    },
    pt: {
      badge: '✨ Excelência Artesanal Desde 1985',
      title: 'Arte Cerâmica Feita à Mão para Jardim & Cozinha',
      description: 'Experimente a beleza do autêntico artesanato com as nossas coleções de cerâmica feitas à mão. Cada peça conta uma história de tradição, criatividade e arte sustentável.',
      export: 'Países',
      artisans: 'Artesãos',
      satisfaction: 'Satisfação',
      garden: 'Coleção Jardim',
  gardenDesc: 'Vasos e plantadores cerâmicos resistentes às intempéries para espaços exteriores e interiores deslumbrantes',      kitchen: 'Elementos Cozinha',
      kitchenDesc: 'Louça cerâmica elegante, pratos e acessórios decorativos',
      global: 'Alcance Global',
      globalDesc: 'Operações de exportação e importação em 5 continentes com logística premium',
      sustainable: 'Artesanato Sustentável',
      sustainableDesc: 'Materiais ecológicos e técnicas tradicionais passadas por gerações',
      contactTitle: 'Conecte-se Conosco',
      address: 'Perto do Hospital Moknine, Moknine 5050, Tunísia',
      phone: '+216 22 241 363',
      email: 'mohamedkhmis101@gmail.com',
      footer: 'Cerâmica artesanal com amor e tradição',
      exportStat: '35+',
      artisansStat: '48',
      satisfactionStat: '99%',
      exploreBtn: 'Explorar Coleção',
      ourCollections: 'Nossas Coleções',
      catalog: 'Ver Catálogo'
    },
    es: {
      badge: '✨ Excelencia Artesanal Desde 1985',
      title: 'Arte Cerámica Hecha a Mano para Jardín y Cocina',
      description: 'Experimente la belleza de la auténtica artesanía con nuestras colecciones de cerámica hechas a mano. Cada pieza cuenta una historia de tradición, creatividad y arte sostenible.',
      export: 'Países',
      artisans: 'Artesanos',
      satisfaction: 'Satisfacción',
      garden: 'Colección Jardín',
 gardenDesc: 'Macetas y plantadores de cerámica resistentes a la intemperie para espacios exteriores e interiores impresionantes',      kitchen: 'Elementos Cocina',
      kitchenDesc: 'Vajilla de cerámica elegante, platos y accesorios decorativos',
      global: 'Alcance Global',
      globalDesc: 'Operaciones de exportación e importación en 5 continentes con logística premium',
      sustainable: 'Arte Sostenible',
      sustainableDesc: 'Materiales ecológicos y técnicas tradicionales transmitidas por generaciones',
      contactTitle: 'Conecta Con Nosotros',
      address: 'Cerca del Hospital Moknine, Moknine 5050, Túnez',
      phone: '+216 22 241 363',
      email: 'mohamedkhmis101@gmail.com',
      footer: 'Cerámica artesanal con amor y tradición',
      exportStat: '35+',
      artisansStat: '48',
      satisfactionStat: '99%',
      exploreBtn: 'Explorar Colección',
      ourCollections: 'Nuestras Colecciones',
      catalog: 'Ver Catálogo'
    },
    fr: {
      badge: '✨ Excellence Artisanale Depuis 1985',
      title: 'Art Céramique Artisanal pour Jardin & Cuisine',
      description: 'Découvrez la beauté de l\'artisanat authentique avec nos collections de céramique faites à la main. Chaque pièce raconte une histoire de tradition, de créativité et d\'artisanat durable.',
      export: 'Pays',
      artisans: 'Artisans',
      satisfaction: 'Satisfaction',
      garden: 'Collection Jardin',
   gardenDesc: 'Pots et jardinières en céramique résistants aux intempéries pour des espaces extérieur et intérieur magnifiques',      kitchen: 'Éléments Cuisine',
      kitchenDesc: 'Ustensiles de cuisine élégants en céramique, assiettes et accessoires décoratifs',
      global: 'Portée Mondiale',
      globalDesc: 'Opérations d\'exportation et d\'importation sur 5 continents avec logistique premium',
      sustainable: 'Artisanat Durable',
      sustainableDesc: 'Matériaux écologiques et techniques traditionnelles transmises depuis des générations',
      contactTitle: 'Connectez-vous Avec Nous',
      address: 'Près de l\'Hôpital Moknine, Moknine 5050, Tunisie',
      phone: '+216 22 241 363',
      email: 'mohamedkhmis101@gmail.com',
      footer: 'Céramique artisanale avec amour et tradition',
      exportStat: '35+',
      artisansStat: '48',
      satisfactionStat: '99%',
      exploreBtn: 'Explorer la Collection',
      ourCollections: 'Nos Collections',
      catalog: 'Voir le Catalogue'
    },
    ar: {
      badge: '✨ التميز الحرفي منذ 1985',
      title: 'فن الخزف اليدوي للحديقة والمطبخ',
      description: 'اكتشف جمال الحرفية الأصيلة مع مجموعاتنا من السيراميك المصنوع يدويًا. كل قطعة تحكي قصة من التقاليد والإبداع والحرفية المستدامة.',
      export: 'الدول',
      artisans: 'الحرفيون',
      satisfaction: 'الرضا',
      garden: 'مجموعة الحديقة',
    gardenDesc: 'أصص وزراعات سيراميك مقاومة للعوامل الجوية للمساحات الخارجية والداخلية المذهلة',
      kitchen: 'عناصر المطبخ',
      kitchenDesc: 'أواني طهي سيراميك أنيقة، أطباق وإكسسوارات مطبخ ديكورية',
      global: 'الوصول العالمي',
      globalDesc: 'عمليات التصدير والاستيراد عبر 5 قارات مع لوجستيات متميزة',
      sustainable: 'الحرفية المستدامة',
      sustainableDesc: 'مواد صديقة للبيئة وتقنيات تقليدية تنتقل عبر الأجيال',
      contactTitle: 'تواصل معنا',
      address: 'بالقرب من مستشفى المكنين، المكنين 5050، تونس',
      phone: '+216 22 241 363',
      email: 'mohamedkhmis101@gmail.com',
      footer: 'سيراميك handmade مع الحب والتقاليد',
      exportStat: '35+',
      artisansStat: '48',
      satisfactionStat: '99%',
      exploreBtn: 'استكشف المجموعة',
      ourCollections: 'مجموعاتنا',
      catalog: 'عرض الكتالوج'
    }
  };

  constructor(
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit(): void {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      this.isDarkMode = true;
    }
    
    // Check for saved language preference
    const savedLang = localStorage.getItem('language');
    if (savedLang && this.translations[savedLang]) {
      this.currentLang = savedLang;
    }
  }

  ngAfterViewInit(): void {
    // Wait for DOM to be fully ready
    setTimeout(() => {
      this.initMap();
    }, 1000);
  }

  ngOnDestroy(): void {
    if (this.map) {
      this.map.remove();
    }
  }

  initMap(): void {
    try {
      // Check if map container exists and Leaflet is loaded
      const mapElement = document.getElementById('map');
      if (!mapElement) {
        console.error('Map container not found');
        return;
      }
      
      if (this.isMapInitialized) {
        return;
      }
      
      // Check if Leaflet is available
      if (typeof L === 'undefined') {
        console.error('Leaflet is not loaded. Make sure to include Leaflet CSS and JS in angular.json');
        return;
      }
      
      // Moknine coordinates
      const location: [number, number] = [35.632594, 10.911448];
      
      // Initialize map
      this.map = L.map('map').setView(location, 13);
      
      // Add tile layer
      const tileUrl = this.isDarkMode 
        ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
        : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
      
      L.tileLayer(tileUrl, {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19
      }).addTo(this.map);
      
      // Create custom marker HTML
      const customIcon = L.divIcon({
        className: 'custom-marker',
        html: `
          <div style="
            width: 40px;
            height: 40px;
            background: #2c6e3c;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
            border: 3px solid white;
            cursor: pointer;
          ">
            <i class="fas fa-store" style="color: white; font-size: 18px;"></i>
          </div>
        `,
        iconSize: [40, 40],
        popupAnchor: [0, -20]
      });
      
      const marker = L.marker(location, { icon: customIcon }).addTo(this.map);
      
      marker.bindPopup(`
        <div style="padding: 8px;">
          <strong style="color: #2c6e3c;">🏺 SunCeramic Studio</strong><br>
          <span>📍 Near Hospital Moknine, Moknine 5050, Tunisia</span><br>
          <span>🕒 Mon-Fri: 9am-6pm</span><br>
          <span>📅 Sat: 10am-4pm</span>
        </div>
      `).openPopup();
      
      this.isMapInitialized = true;
      
      // Force map refresh
      setTimeout(() => {
        if (this.map) {
          this.map.invalidateSize();
        }
      }, 200);
      
      console.log('Map initialized successfully');
    } catch (error) {
      console.error('Map initialization error:', error);
    }
  }

  toggleTheme(): void {
    this.isDarkMode = !this.isDarkMode;
    
    if (this.isDarkMode) {
      localStorage.setItem('theme', 'dark');
    } else {
      localStorage.setItem('theme', 'light');
    }
    
    // Update map tiles if map exists
    if (this.map && this.isMapInitialized) {
      const tileUrl = this.isDarkMode 
        ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
        : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
      
      this.map.eachLayer((layer: any) => {
        if (layer instanceof L.TileLayer) {
          layer.setUrl(tileUrl);
        }
      });
    }
  }

  changeLanguage(lang: string): void {
    this.currentLang = lang;
    localStorage.setItem('language', lang);
    this.showLanguageMenu = false;
     if (lang === 'ar') {
    this.renderer.setAttribute(this.document.documentElement, 'dir', 'rtl');
    this.renderer.setAttribute(this.document.documentElement, 'lang', 'ar');
  } else {
    this.renderer.setAttribute(this.document.documentElement, 'dir', 'ltr');
    this.renderer.setAttribute(this.document.documentElement, 'lang', lang);
  }
  }

  getTranslation(key: string): string {
    return this.translations[this.currentLang][key] || key;
  }

  redirectTo(platform: string): void {
    const links: any = {
      facebook: 'https://www.facebook.com/share/1AvtUa38ph/?mibextid=wwXIfr',
      whatsapp: 'https://wa.me/+21622241363',
      email: 'mailto:mohamedkhmis101@gmail.com',
      instagram: 'https://www.instagram.com/sun.ceramic1?igsh=N2FiOWV0YzR3ZDhx',
      catalog: 'https://online.fliphtml5.com/dqlvkq/SUNCERAMIQUE-CATALOGUE2026/#p=4'
    };
    window.open(links[platform], '_blank');
  }

  toggleLanguageMenu(): void {
    this.showLanguageMenu = !this.showLanguageMenu;
  }

  @HostListener('window:resize')
  onResize(): void {
    if (this.map && this.isMapInitialized) {
      setTimeout(() => {
        this.map.invalidateSize();
      }, 100);
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.language-selector')) {
      this.showLanguageMenu = false;
    }
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}