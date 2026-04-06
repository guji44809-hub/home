import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GoogleGenAI } from "@google/genai";
import { 
  ShoppingCart, Phone, MapPin, Clock, ChevronRight, X, 
  CheckCircle2, Utensils, Info, ExternalLink, ArrowLeft,
  Package, Truck, CheckCircle, ClipboardList, Heart,
  Home as HomeIcon, Sun, Leaf, Star, QrCode, Navigation,
  AlertTriangle, CreditCard, User, MessageSquare, Send, Loader2
} from 'lucide-react';
import { MENU_DATA, QUIZ_QUESTIONS, MenuItem } from './types.ts';

type View = 'home' | 'menu' | 'quiz' | 'tracking';
type OrderStatus = 'accepted' | 'preparing' | 'ready' | 'delivering' | 'completed';
type DeliveryType = 'delivery' | 'pickup';
type Zone = 'green' | 'yellow' | 'red';

const STORE_LOCATION = { lat: 25.049, lng: 121.517 }; // Approx for 承德路一段 23 號

const Logo = ({ className = "w-12 h-12" }) => (
  <div className={`${className} relative flex items-center justify-center group`}>
    {/* Sticker Effect Background */}
    <div className="absolute inset-[-4px] bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity" />
    
    {/* Circular Border */}
    <div className="absolute inset-0 border-[3px] border-[#431407] rounded-full bg-white shadow-sm z-10" />
    
    <div className="relative flex flex-col items-center justify-center z-20">
      {/* Sun with Rays */}
      <div className="relative -mb-1">
        <Sun className="text-brand-sun w-6 h-6 fill-current" />
      </div>
      
      {/* House with Heart */}
      <div className="relative">
        <HomeIcon className="text-brand-dark w-6 h-6 fill-current" />
        <Heart className="absolute top-[55%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-red-500 w-2.5 h-2.5 fill-current" />
      </div>
      
      {/* Two Leaves */}
      <div className="flex gap-0.5 mt-[-3px]">
        <Leaf className="text-brand-leaf w-4 h-4 rotate-[-45deg] fill-current" />
        <Leaf className="text-brand-leaf w-4 h-4 rotate-[45deg] fill-current" />
      </div>
    </div>
  </div>
);

export default function App() {
  const [view, setView] = useState<View>('home');
  const [quizStep, setQuizStep] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [hasCoupon, setHasCoupon] = useState(false);
  const [cart, setCart] = useState<{ item: MenuItem; quantity: number }[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<'none' | 'coupon' | 'utensils' | 'deliveryType' | 'zoneCheck'>('none');
  const [useCoupon, setUseCoupon] = useState(false);
  const [needUtensils, setNeedUtensils] = useState<boolean | null>(null);
  const [deliveryType, setDeliveryType] = useState<DeliveryType>('pickup');
  const [userDistance, setUserDistance] = useState<number>(0.5); // Default 0.5km
  const [orderStatus, setOrderStatus] = useState<OrderStatus>('accepted');
  const [orderProgress, setOrderProgress] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackAnswers, setFeedbackAnswers] = useState<string[]>([]);
  const [notifications, setNotifications] = useState<{ id: number; message: string; type: 'info' | 'warning' | 'success' }[]>([]);

  const addNotification = (message: string, type: 'info' | 'warning' | 'success' = 'info') => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 5000);
  };

  const resetOrder = () => {
    setCart([]);
    setOrderStatus('accepted');
    setOrderProgress(0);
    setShowFeedback(false);
    setFeedbackAnswers([]);
    setView('home');
    setCheckoutStep('none');
    setUseCoupon(false);
    setNeedUtensils(null);
  };

  const isInstantOrder = () => {
    const now = new Date();
    const hours = now.getHours();
    const mins = now.getMinutes();
    const time = hours + mins / 60;
    return time >= 7.5 && time <= 11.5;
  };

  const getZone = (dist: number): Zone => {
    if (dist <= 1.5) return 'green';
    if (dist <= 3.0) return 'yellow';
    return 'red';
  };

  const deliveryFee = () => {
    if (deliveryType === 'pickup') return 0;
    const zone = getZone(userDistance);
    if (zone === 'green') return 0;
    if (zone === 'yellow') return cart.length >= 5 ? 0 : 50;
    return 0; // Red is blocked
  };

  const contactRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const completed = localStorage.getItem('quiz_completed') === 'true';
    const hasC = localStorage.getItem('has_coupon') === 'true';
    setQuizCompleted(completed);
    setHasCoupon(hasC);
    
    // Simulate getting user distance
    setUserDistance(Math.random() * 4); // 0 to 4km
  }, []);

  useEffect(() => {
    if (view === 'tracking') {
      const interval = setInterval(() => {
        setOrderProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 0.5;
        });
      }, 200);

      const statusTimeout = setTimeout(() => {
        setOrderStatus('preparing');
        
        // Delay reminder simulation
        const delayTimeout = setTimeout(() => {
          if (orderStatus === 'preparing') {
            addNotification('店家正忙碌中，請稍候，我們正加快速度準備您的餐點！', 'warning');
          }
        }, 15000); // 15 seconds for demo purposes

        setTimeout(() => {
          setOrderStatus(deliveryType === 'delivery' ? 'delivering' : 'ready');
          addNotification(deliveryType === 'delivery' ? '外送夥伴已取餐，正全速前往您的位置！' : '餐點已準備完成，歡迎來店取餐！', 'success');
          
          setTimeout(() => {
            setOrderStatus('completed');
            setShowFeedback(true);
            addNotification('訂單已完成，祝您用餐愉快！', 'success');
          }, 10000);
        }, 8000);

        return () => clearTimeout(delayTimeout);
      }, 4000);

      return () => {
        clearInterval(interval);
        clearTimeout(statusTimeout);
      };
    }
  }, [view, deliveryType]);

  const handleQuizAnswer = () => {
    if (quizStep < QUIZ_QUESTIONS.length - 1) {
      setQuizStep(quizStep + 1);
    } else {
      setQuizCompleted(true);
      setHasCoupon(true);
      localStorage.setItem('quiz_completed', 'true');
      localStorage.setItem('has_coupon', 'true');
      setQuizStep(quizStep + 1);
    }
  };

  const addToCart = (item: MenuItem) => {
    setCart(prev => {
      const existing = prev.find(i => i.item.id === item.id);
      if (existing) return prev.map(i => i.item.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      return [...prev, { item, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(i => i.item.id === id ? { ...i, quantity: Math.max(1, i.quantity + delta) } : i));
  };

  const subtotal = cart.reduce((sum, i) => sum + i.item.price * i.quantity, 0);
  
  // Find the highest price item to apply the $49 coupon
  const highestPriceItem = cart.length > 0 
    ? [...cart].sort((a, b) => b.item.price - a.item.price)[0].item
    : null;

  const total = Math.max(0, 
    useCoupon && highestPriceItem
      ? (subtotal - highestPriceItem.price) + 49 + deliveryFee()
      : subtotal + deliveryFee()
  );

  const startCheckout = () => {
    setCheckoutStep('deliveryType');
  };

  const handleDeliveryTypeSelect = (type: DeliveryType) => {
    setDeliveryType(type);
    if (type === 'delivery') {
      setCheckoutStep('zoneCheck');
    } else {
      proceedAfterZone();
    }
  };

  const proceedAfterZone = () => {
    if (hasCoupon && !useCoupon) setCheckoutStep('coupon');
    else setCheckoutStep('utensils');
  };

  const finalizeOrder = () => {
    if (useCoupon) {
      setHasCoupon(false);
      localStorage.setItem('has_coupon', 'false');
    }
    setCheckoutStep('none');
    setIsCartOpen(false);
    setView('tracking');
    addNotification('下單成功！店家已收到您的訂單。', 'success');
  };

  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<{ role: 'user' | 'model'; text: string }[]>([
    { role: 'model', text: '您好！我是阿爸的家園智能客服，很高興為您服務。請問有什麼我可以幫您的嗎？' }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  const handleSendMessage = async (text?: string) => {
    const messageToSend = text || chatInput;
    if (!messageToSend.trim() || isChatLoading) return;

    const userMessage = messageToSend.trim();
    setChatMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    if (!text) setChatInput('');
    setIsChatLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const model = "gemini-3-flash-preview";
      
      const systemInstruction = `
        您是「阿爸的家園 (Healthy Nutrition Center)」的智能客服。
        
        店鋪資訊：
        - 地址：台北市大同區承德路一段23號一樓
        - 電話：0906-000-923 / 02-25236643
        - 營業時間：週一至週五 07:30 - 11:30 (11:30 後僅開放預約隔日訂單)
        
        菜單分類與精選餐點：
        1. 增肌減脂：
           - 義式香草舒肥雞地瓜碗 ($160)
           - 青檸紙包鮮鱸五穀定食 ($210)
           - 黑胡椒嫩煎牛排溫沙拉 ($250)
        2. 調整腸胃：
           - 暖心味噌豆腐鮮菇盅 ($140)
           - 藍莓奇亞籽希臘優格杯 ($130)
           - 秋葵山藥雞肉蕎麥冷麵 ($170)
        3. 運動補充：
           - 慢火烤豬里肌糙米增能餐 ($180)
           - 全麥牛肉時蔬能量捲餅 ($150)
           - 照燒雞腿紫米機能餐 ($185)
        4. 孕期營養：
           - 挪威炙烤鮭魚藜麥養胎飯 ($280)
           - 鮮味蛤蜊燉雞紅莧菜餐 ($250)
           - 麻油龍膽石斑魚湯定食 ($320)
        5. 銀髮族：
           - 絲瓜蛤蜊滑豆腐軟食餐 ($180)
           - 深海魚片翡翠燕麥粥 ($170)
           - 清蒸冬瓜獅子頭碎肉餐 ($160)
        6. 兒童長高：
           - 紅燒番茄嫩牛長高定食 ($190)
           - 起司彩椒雞丁烘蛋套餐 ($160)
           - 芝麻淋醬鮮魚柳飯糰 ($145)
        
        三天窈窕體驗：
        這是我們的招牌計畫，由營養師調配。現在完成網站上的「營養健康測驗」即可領取 $49 體驗券，用於首購體驗。
        
        如何訂購：
        點擊網頁上的「立即訂購」按鈕進入菜單，選擇餐點加入購物車後結帳即可。
        
        回覆原則：
        1. 親切、專業、簡潔。
        2. 若使用者詢問地址、電話、時間、菜單、體驗或訂購方式，請準確回答。
        3. 使用繁體中文。
      `;

      const response = await ai.models.generateContent({
        model: model,
        contents: [
          { role: 'user', parts: [{ text: systemInstruction }] },
          ...chatMessages.map(m => ({ role: m.role, parts: [{ text: m.text }] })),
          { role: 'user', parts: [{ text: userMessage }] }
        ]
      });

      const aiText = response.text || "抱歉，我現在無法處理您的請求，請稍後再試。";
      setChatMessages(prev => [...prev, { role: 'model', text: aiText }]);
    } catch (error) {
      console.error("Chat Error:", error);
      setChatMessages(prev => [...prev, { role: 'model', text: "抱歉，連線發生問題，請檢查您的網路或稍後再試。" }]);
    } finally {
      setIsChatLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 font-sans text-stone-900">
      <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-stone-200 px-4 py-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setView('home')}>
          <Logo className="w-12 h-12" />
          <div>
            <h1 className="font-display text-2xl leading-none text-brand-dark tracking-tight">阿爸的家園</h1>
            <p className="text-[10px] text-stone-500 tracking-[0.15em] font-medium uppercase mt-1">Healthy Nutrition Center</p>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <button onClick={() => setView('home')} className={`text-sm font-bold transition-colors ${view === 'home' ? 'text-brand-primary' : 'text-stone-500 hover:text-brand-primary'}`}>首頁</button>
          <button onClick={() => setView('menu')} className={`text-sm font-bold transition-colors ${view === 'menu' ? 'text-brand-primary' : 'text-stone-500 hover:text-brand-primary'}`}>菜單</button>
          <button 
            onClick={() => { if (!quizCompleted) { setQuizStep(0); setView('quiz'); } }} 
            className={`text-sm font-bold transition-colors ${quizCompleted ? 'text-stone-300 cursor-not-allowed' : view === 'quiz' ? 'text-brand-primary' : 'text-stone-500 hover:text-brand-primary'}`}
          >
            {quizCompleted ? '已領取優惠' : '營養測驗'}
          </button>
          <button onClick={() => setIsCartOpen(true)} className="relative p-2 text-stone-600 hover:text-brand-primary transition-colors">
            <ShoppingCart size={24} />
            {cart.length > 0 && <span className="absolute top-0 right-0 bg-brand-primary text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">{cart.reduce((s, i) => s + i.quantity, 0)}</span>}
          </button>
        </div>
      </nav>

      {/* Notifications Overlay */}
      <div className="fixed top-20 right-4 z-[100] flex flex-col gap-3 pointer-events-none">
        <AnimatePresence>
          {notifications.map(n => (
            <motion.div
              key={n.id}
              initial={{ opacity: 0, x: 50, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className={`pointer-events-auto p-4 rounded-2xl shadow-xl flex items-center gap-3 min-w-[300px] max-w-md border ${
                n.type === 'success' ? 'bg-brand-leaf/20 border-brand-leaf/30 text-brand-dark' :
                n.type === 'warning' ? 'bg-brand-sun/20 border-brand-sun/30 text-brand-dark' :
                'bg-stone-50 border-stone-200 text-stone-800'
              }`}
            >
              {n.type === 'success' ? <CheckCircle2 className="text-brand-leaf shrink-0" /> :
               n.type === 'warning' ? <AlertTriangle className="text-brand-primary shrink-0" /> :
               <Info className="text-stone-500 shrink-0" />}
              <p className="text-sm font-bold">{n.message}</p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <AnimatePresence mode="wait">
        {view === 'home' && (
          <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {/* Hero Section */}
            <section className="relative h-[550px] flex items-center justify-center text-center px-4 overflow-hidden">
              <div className="absolute inset-0 z-0">
                <img src="https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&q=80&w=1920" className="w-full h-full object-cover brightness-[0.35]" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-stone-900/50" />
              </div>
              <div className="relative z-10 max-w-4xl">
                <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
                  <h2 className="text-7xl md:text-9xl font-display text-white mb-6 tracking-tight drop-shadow-2xl">阿爸的家園</h2>
                  <p className="text-white/90 text-xl md:text-2xl mb-12 font-light tracking-wide max-w-2xl mx-auto">給家人吃的，當然要最好。<br />專業營養師調配，守護您每一餐的健康。</p>
                  <div className="flex flex-col sm:flex-row gap-6 justify-center">
                    {isInstantOrder() ? (
                      <button onClick={() => setView('menu')} className="bg-brand-primary text-white font-bold px-12 py-5 rounded-full shadow-2xl hover:bg-brand-dark transition-all transform hover:scale-105 flex items-center justify-center gap-2 text-lg">立即點餐 <ChevronRight size={22} /></button>
                    ) : (
                      <button onClick={() => setView('menu')} className="bg-brand-dark text-white font-bold px-12 py-5 rounded-full shadow-2xl hover:bg-brand-primary transition-all transform hover:scale-105 flex items-center justify-center gap-2 text-lg">預約隔日訂單 <Clock size={22} /></button>
                    )}
                    <button 
                      onClick={() => { if (!quizCompleted) { setQuizStep(0); setView('quiz'); } }} 
                      className={`bg-white text-brand-dark font-bold px-12 py-5 rounded-full shadow-2xl transition-all transform hover:scale-105 flex items-center justify-center gap-2 text-lg ${quizCompleted ? 'opacity-50 cursor-not-allowed' : 'hover:bg-brand-sun/10'}`}
                    >
                      {quizCompleted ? '已領取 $49 優惠' : '測驗領 $49 券'} <Star size={22} className={`${quizCompleted ? 'text-stone-400' : 'text-brand-sun'} fill-current`} />
                    </button>
                  </div>
                  {!isInstantOrder() && (
                    <p className="text-brand-sun mt-6 font-bold flex items-center justify-center gap-2">
                      <Info size={18} /> 目前非即時供應時段，僅開放預約訂單
                    </p>
                  )}
                </motion.div>
              </div>
            </section>

            {/* Store Introduction */}
            <section className="py-24 bg-white">
              <div className="container mx-auto px-4 max-w-6xl">
                <div className="grid md:grid-cols-2 gap-20 items-center">
                  <div className="relative">
                    <img src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=1000" className="rounded-[40px] shadow-2xl relative z-10" referrerPolicy="no-referrer" />
                    <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-brand-sun/10 rounded-full -z-10 blur-3xl opacity-60" />
                  </div>
                  <div>
                    <div className="inline-block bg-brand-sun/20 text-brand-primary font-bold px-4 py-2 rounded-full text-sm mb-6 uppercase tracking-widest">OUR STORY</div>
                    <h3 className="text-4xl md:text-5xl font-display mb-8 text-brand-dark">源自於一份對家人的愛</h3>
                    <p className="text-stone-600 mb-8 leading-relaxed text-lg">
                      「阿爸的家園」創立於 2020 年，初衷很簡單：為忙碌的現代人提供一份像家一樣溫暖、像父親一樣嚴謹的健康便當。
                    </p>
                    <p className="text-stone-600 mb-10 leading-relaxed text-lg">
                      我們相信，健康的飲食不應該是乏味的。透過精確的營養計算與低溫烹調技術，我們保留了食材最原始的鮮甜與營養價值。
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                      <div className="flex items-start gap-4">
                        <div className="bg-brand-leaf/10 p-3 rounded-2xl text-brand-leaf"><Leaf size={24} /></div>
                        <div><h5 className="font-bold mb-1 text-brand-dark">嚴選在地食材</h5><p className="text-sm text-stone-500">每日產地直送，確保新鮮度與品質。</p></div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="bg-brand-sun/10 p-3 rounded-2xl text-brand-primary"><Utensils size={24} /></div>
                        <div><h5 className="font-bold mb-1 text-brand-dark">營養師監製</h5><p className="text-sm text-stone-500">精準計算卡路里與三大營養素比例。</p></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Slim Experience Banner */}
            <section className="py-16 bg-brand-dark relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-brand-primary/20 rounded-full blur-3xl -mr-48 -mt-48" />
              <div className="container mx-auto px-4 max-w-6xl relative z-10">
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-[40px] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
                  <div className="text-center md:text-left">
                    <h4 className="text-3xl md:text-4xl font-bold text-white mb-4">三天窈窕體驗 好評不斷</h4>
                    <p className="text-stone-300 text-lg md:text-xl max-w-xl">專業營養配餐，開啟您的輕盈生活。現在點擊，免費了解更多詳情！</p>
                  </div>
                  <button 
                    onClick={() => window.open('https://line.me/ti/p/EL7tWNL7f0#~', '_blank')}
                    className="bg-brand-primary text-white font-bold px-12 py-5 rounded-full shadow-2xl hover:bg-brand-sun hover:text-brand-dark transition-all transform hover:scale-105 flex items-center gap-3 text-xl whitespace-nowrap group"
                  >
                    免費了解 <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </section>

            {/* Features Section */}
            <section className="py-24 bg-stone-50">
              <div className="container mx-auto px-4 text-center mb-16">
                <h3 className="text-4xl font-display mb-4 text-brand-dark">為什麼選擇我們？</h3>
                <p className="text-stone-500">我們在細節中展現對健康的堅持</p>
              </div>
              <div className="container mx-auto px-4 max-w-6xl grid md:grid-cols-3 gap-10">
                {[
                  { title: '低 GI 澱粉', desc: '選用紫米、地瓜、藜麥，穩定血糖不昏沉。', icon: Info },
                  { title: '舒肥烹調', desc: '低溫慢煮鎖住肉汁，口感鮮嫩不乾柴。', icon: Heart },
                  { title: '無添加', desc: '拒絕人工色素與防腐劑，吃得安心無負擔。', icon: CheckCircle2 }
                ].map((f, i) => (
                  <div key={i} className="bg-white p-10 rounded-[32px] shadow-sm border border-stone-100 hover:shadow-xl transition-all">
                    <div className="w-16 h-16 bg-stone-50 rounded-2xl flex items-center justify-center text-brand-primary mb-8 mx-auto"><f.icon size={32} /></div>
                    <h5 className="text-xl font-bold mb-4 text-brand-dark">{f.title}</h5>
                    <p className="text-stone-500 leading-relaxed">{f.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Contact & Location Section */}
            <section className="py-24 bg-white">
              <div className="container mx-auto px-4 max-w-6xl">
                <div className="bg-[#431407] rounded-[40px] overflow-hidden shadow-2xl flex flex-col lg:flex-row">
                  <div className="lg:w-1/2 p-12 md:p-16 text-white">
                    <h3 className="text-4xl md:text-5xl font-display mb-8">來店裡坐坐</h3>
                    <p className="text-stone-300 mb-12 text-lg">鄰近京站、台北轉運站，交通便利。歡迎來店諮詢專業營養師，為您量身打造健康餐盤。</p>
                    
                    <div className="space-y-8">
                      <div className="flex items-center gap-6">
                        <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-brand-primary"><MapPin size={24} /></div>
                        <div>
                          <p className="text-stone-400 text-sm uppercase tracking-widest mb-1">門市地址</p>
                          <p className="text-xl font-bold">台北市大同區承德路一段 23 號 1 樓</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-brand-primary"><Phone size={24} /></div>
                        <div>
                          <p className="text-stone-400 text-sm uppercase tracking-widest mb-1">聯絡電話</p>
                          <p className="text-xl font-bold">02-2523-6643 / 0906-000-923</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-brand-primary"><Clock size={24} /></div>
                        <div>
                          <p className="text-stone-400 text-sm uppercase tracking-widest mb-1">營業時間</p>
                          <p className="text-xl font-bold">週一至週五 07:30 - 11:30 (即時點餐)</p>
                          <p className="text-stone-400 text-sm mt-1">11:30 後僅開放預約隔日訂單</p>
                        </div>
                      </div>
                    </div>
                    
                    <button 
                      onClick={() => window.open(`https://www.google.com/maps/dir/?api=1&destination=${STORE_LOCATION.lat},${STORE_LOCATION.lng}`, '_blank')}
                      className="mt-12 bg-brand-primary text-white font-bold px-10 py-4 rounded-full hover:bg-brand-dark transition-all flex items-center gap-2"
                    >
                      <Navigation size={20} /> 開啟導航
                    </button>
                  </div>
                  <div className="lg:w-1/2 h-[400px] lg:h-auto relative">
                    <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=1000" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#431407] to-transparent lg:block hidden" />
                  </div>
                </div>
              </div>
            </section>
          </motion.div>
        )}

        {view === 'menu' && (
          <motion.div key="menu" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex-grow container mx-auto px-4 py-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
              <h3 className="text-4xl font-display text-brand-dark">營養菜單</h3>
              {!isInstantOrder() && (
                <div className="bg-brand-sun/10 border border-brand-sun/30 px-6 py-3 rounded-2xl flex items-center gap-3 text-brand-dark">
                  <Clock size={20} className="shrink-0 text-brand-primary" />
                  <div>
                    <p className="font-bold leading-none">預約模式啟動</p>
                    <p className="text-xs mt-1 opacity-80">11:30 後僅開放預約隔日訂單</p>
                  </div>
                </div>
              )}
            </div>

            {/* Category Quick Jump */}
            <div className="sticky top-[73px] z-30 bg-stone-50/80 backdrop-blur-md py-4 mb-12 -mx-4 px-4 overflow-x-auto no-scrollbar flex gap-3 border-b border-stone-200">
              {Array.from(new Set(MENU_DATA.map(i => i.category))).map(category => (
                <button
                  key={category}
                  onClick={() => {
                    const element = document.getElementById(`category-${category}`);
                    if (element) {
                      const offset = 160; // Offset for sticky headers
                      const bodyRect = document.body.getBoundingClientRect().top;
                      const elementRect = element.getBoundingClientRect().top;
                      const elementPosition = elementRect - bodyRect;
                      const offsetPosition = elementPosition - offset;

                      window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                      });
                    }
                  }}
                  className="whitespace-nowrap px-6 py-3 rounded-full bg-white border border-stone-200 text-stone-600 font-bold hover:border-brand-primary hover:text-brand-primary transition-all shadow-sm active:scale-95"
                >
                  {category}
                </button>
              ))}
            </div>

            {Array.from(new Set(MENU_DATA.map(i => i.category))).map(category => (
              <div key={category} id={`category-${category}`} className="mb-16 scroll-mt-40">
                <h4 className="text-2xl font-display mb-8 flex items-center gap-3"><span className="w-2 h-8 bg-brand-primary rounded-full" />{category}</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {MENU_DATA.filter(i => i.category === category).map(item => (
                    <div key={item.id} className="bg-white rounded-[40px] overflow-hidden shadow-sm border border-stone-100 flex flex-col hover:shadow-xl transition-all duration-300 group">
                      {item.image && (
                        <div className="aspect-square overflow-hidden relative">
                          <img 
                            src={item.image} 
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                            referrerPolicy="no-referrer" 
                            alt={item.name}
                            loading="lazy"
                          />
                          <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md text-brand-primary px-4 py-1.5 rounded-full font-bold text-xs shadow-lg border border-white/20 uppercase tracking-widest">
                            {item.category}
                          </div>
                          <div className="absolute top-6 right-6 bg-brand-dark/80 backdrop-blur-md text-white px-5 py-2 rounded-full font-display text-xl shadow-2xl border border-white/20">
                            ${item.price}
                          </div>
                        </div>
                      )}
                      <div className="p-8 flex-grow flex flex-col">
                        <div className="flex justify-between items-start mb-4">
                          <h5 className="text-2xl font-bold text-brand-dark">{item.name}</h5>
                          {!item.image && <div className="bg-brand-sun/20 px-4 py-2 rounded-2xl text-brand-primary font-bold shadow-sm">${item.price}</div>}
                        </div>
                        
                        <div className="flex gap-2 mb-4">
                          <span className="text-[10px] bg-stone-100 px-2 py-1 rounded-md font-bold text-stone-500">P: {item.pfc.p}g</span>
                          <span className="text-[10px] bg-stone-100 px-2 py-1 rounded-md font-bold text-stone-500">F: {item.pfc.f}g</span>
                          <span className="text-[10px] bg-stone-100 px-2 py-1 rounded-md font-bold text-stone-500">C: {item.pfc.c}g</span>
                          <span className="text-[10px] bg-brand-sun/20 px-2 py-1 rounded-md font-bold text-brand-primary">{item.pfc.cal} kcal</span>
                        </div>
                        <p className="text-sm text-stone-600 mb-6 bg-stone-50 p-4 rounded-2xl flex-grow">{item.nutrition}</p>
                        <button onClick={() => addToCart(item)} className="w-full bg-brand-dark text-white font-bold py-4 rounded-2xl hover:bg-brand-primary transition-colors flex items-center justify-center gap-2">加入購物車</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {view === 'quiz' && (
          <motion.div key="quiz" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="flex-grow flex items-center justify-center p-4">
            <div className="bg-white rounded-[40px] shadow-2xl w-full max-w-xl overflow-hidden">
              <div className="bg-brand-primary p-10 text-white text-center">
                <h4 className="text-4xl font-display mb-2">營養健康測驗</h4>
                <p className="text-brand-sun">完成即可領取 $49 體驗券</p>
              </div>
              <div className="p-10">
                {quizStep < QUIZ_QUESTIONS.length ? (
                  <>
                    <div className="flex justify-between items-center mb-10">
                      <div className="flex gap-2">{QUIZ_QUESTIONS.map((_, i) => <div key={i} className={`h-1.5 w-8 rounded-full ${i <= quizStep ? 'bg-brand-primary' : 'bg-stone-100'}`} />)}</div>
                      <span className="text-stone-400 text-sm font-bold">{quizStep + 1} / {QUIZ_QUESTIONS.length}</span>
                    </div>
                    <h4 className="text-3xl font-display mb-10 text-brand-dark">{QUIZ_QUESTIONS[quizStep].question}</h4>
                    <div className="grid gap-4">
                      {QUIZ_QUESTIONS[quizStep].options.map(opt => (
                        <button key={opt} onClick={handleQuizAnswer} className="w-full text-left p-6 rounded-3xl border-2 border-stone-100 hover:border-brand-primary hover:bg-brand-sun/10 font-bold text-stone-700 transition-all">{opt}</button>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="text-center py-10">
                    <div className="w-24 h-24 bg-brand-sun/20 rounded-full flex items-center justify-center text-brand-primary mx-auto mb-8">
                      <CheckCircle2 size={48} />
                    </div>
                    <h4 className="text-4xl font-display mb-4 text-brand-dark">恭喜完成測驗！</h4>
                    <p className="text-stone-500 mb-10 text-lg">您已獲得 $49 體驗券，點餐時將自動折抵最高價餐點。</p>
                    <button onClick={() => setView('menu')} className="w-full bg-brand-primary text-white font-bold py-5 rounded-3xl hover:bg-brand-dark transition-all shadow-lg shadow-brand-primary/20">立即前往點餐</button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {view === 'tracking' && (
          <motion.div key="tracking" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="flex-grow container mx-auto px-4 py-12 max-w-4xl">
            <div className="bg-white rounded-[40px] shadow-xl overflow-hidden border border-stone-100 p-8 md:p-12">
              <div className="flex flex-col md:flex-row justify-between mb-12 gap-6">
                <div>
                  <h3 className="text-4xl font-display mb-2">訂單追蹤</h3>
                  <p className="text-stone-500 font-mono">編號: #AB-{new Date().toISOString().slice(0,10).replace(/-/g,'')}-001</p>
                </div>
                <div className="bg-brand-sun/10 px-6 py-4 rounded-3xl text-brand-primary font-bold flex items-center gap-3 shadow-sm">
                  <Clock size={22} className="animate-pulse" /> 
                  <div className="text-left">
                    <p className="text-[10px] uppercase tracking-wider opacity-70">預計送達時間</p>
                    <p className="text-lg leading-none">12:30 PM</p>
                  </div>
                </div>
              </div>

              {/* Progress Tracker */}
              <div className="relative mb-24 mt-12 px-4">
                <div className="absolute top-1/2 left-0 w-full h-3 bg-stone-100 -translate-y-1/2 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }} 
                    animate={{ width: `${orderProgress}%` }} 
                    className="h-full bg-gradient-to-r from-brand-sun to-brand-primary shadow-[0_0_15px_rgba(217,119,6,0.4)]" 
                  />
                </div>
                <div className="relative flex justify-between">
                  {[
                    { icon: ClipboardList, label: '已接單', status: 'accepted', desc: '店家已收到訂單並確認食材' },
                    { icon: Package, label: '製作中', status: 'preparing', desc: '主廚正在為您準備健康美味' },
                    { icon: deliveryType === 'delivery' ? Truck : QrCode, label: deliveryType === 'delivery' ? '配送中' : '待取餐', status: deliveryType === 'delivery' ? 'delivering' : 'ready', desc: deliveryType === 'delivery' ? '外送夥伴配送中' : '請至店內取餐' },
                    { icon: CheckCircle, label: '已完成', status: 'completed', desc: '祝您用餐愉快' }
                  ].map((step, i) => {
                    const isCompleted = (step.status === 'accepted' && orderProgress > 25) ||
                                      (step.status === 'preparing' && orderProgress > 50) || 
                                      (step.status === 'delivering' && orderProgress > 75) ||
                                      (step.status === 'ready' && orderProgress > 75) ||
                                      (step.status === 'completed' && orderProgress >= 100);
                    const isActive = (step.status === 'accepted' && orderProgress <= 25) ||
                                   (step.status === 'preparing' && orderProgress > 25 && orderProgress <= 50) || 
                                   (step.status === 'delivering' && orderProgress > 50 && orderProgress <= 75) ||
                                   (step.status === 'ready' && orderProgress > 50 && orderProgress <= 75) ||
                                   (step.status === 'completed' && orderProgress > 75);
                    
                    return (
                      <div key={i} className="flex flex-col items-center max-w-[120px] text-center">
                        <motion.div 
                          animate={isActive ? { scale: [1, 1.1, 1] } : {}}
                          transition={{ repeat: Infinity, duration: 2 }}
                          className={`w-16 h-16 rounded-full flex items-center justify-center z-10 transition-all duration-500 shadow-lg ${isCompleted || isActive ? 'bg-brand-primary text-white' : 'bg-white text-stone-300 border-2 border-stone-100'}`}
                        >
                          <step.icon size={28} />
                        </motion.div>
                        <div className="mt-4">
                          <p className={`font-bold text-sm mb-1 ${isActive ? 'text-brand-primary' : 'text-stone-700'}`}>{step.label}</p>
                          {isActive && <p className="text-[10px] text-stone-400 leading-tight hidden md:block">{step.desc}</p>}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* QR Code or Map Section */}
              {orderStatus === 'ready' && deliveryType === 'pickup' && (
                <div className="mb-12 flex flex-col items-center bg-brand-sun/10 p-8 rounded-[32px] border-2 border-dashed border-brand-sun/30">
                  <h4 className="font-bold text-brand-dark mb-4">取餐核銷碼</h4>
                  <div className="bg-white p-4 rounded-2xl shadow-inner mb-4">
                    <QrCode size={160} className="text-stone-900" />
                  </div>
                  <p className="text-sm text-brand-primary font-bold mb-6">請向店員出示此碼領取餐點</p>
                  <button 
                    onClick={() => window.open(`https://www.google.com/maps/dir/?api=1&destination=${STORE_LOCATION.lat},${STORE_LOCATION.lng}`, '_blank')}
                    className="bg-white text-brand-primary font-bold px-6 py-3 rounded-2xl shadow-sm flex items-center gap-2 hover:bg-brand-sun/20 transition-colors"
                  >
                    <Navigation size={18} /> 開啟地圖導航
                  </button>
                </div>
              )}

              {orderStatus === 'delivering' && deliveryType === 'delivery' && (
                <div className="mb-12 bg-stone-900 rounded-[32px] h-48 relative overflow-hidden flex items-center justify-center">
                  <div className="absolute inset-0 opacity-30">
                    <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=1000" className="w-full h-full object-cover" />
                  </div>
                  <div className="relative z-10 text-white text-center">
                    <Truck size={48} className="mx-auto mb-4 animate-bounce" />
                    <p className="font-bold">外送員正在路上...</p>
                    <p className="text-xs text-white/60 mt-1">串接 Google Maps 實時位置</p>
                  </div>
                </div>
              )}

              {/* Feedback Modal */}
              <AnimatePresence>
                {showFeedback && (
                  <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="mb-12 bg-brand-leaf/10 p-8 rounded-[32px] border border-brand-leaf/20 text-center">
                    <CheckCircle2 size={48} className="text-brand-leaf mx-auto mb-4" />
                    <h4 className="text-xl font-bold text-brand-dark mb-2">用餐愉快嗎？</h4>
                    <p className="text-brand-leaf text-sm mb-6">填寫健康四問，幫助我們做得更好</p>
                    <div className="grid gap-3">
                      {['飽足感適中', '口味清爽', '精神變好', '消化順暢'].map(q => (
                        <button 
                          key={q} 
                          onClick={() => setFeedbackAnswers(prev => prev.includes(q) ? prev.filter(x => x !== q) : [...prev, q])}
                          className={`py-3 rounded-2xl font-bold transition-all ${feedbackAnswers.includes(q) ? 'bg-brand-leaf text-white' : 'bg-white text-brand-leaf border border-brand-leaf/20'}`}
                        >
                          {q}
                        </button>
                      ))}
                    </div>
                    <button onClick={() => setShowFeedback(false)} className="mt-6 text-brand-leaf font-bold text-sm underline">提交回饋</button>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Order Summary Card */}
              <div className="bg-stone-50 rounded-[32px] p-8 md:p-10 border border-stone-100">
                <h4 className="text-xl font-bold mb-8 flex items-center gap-3">
                  <ClipboardList size={24} className="text-brand-primary" /> 
                  訂單明細
                </h4>
                <div className="space-y-6 mb-8">
                  {cart.map(i => (
                    <div key={i.item.id} className="flex justify-between items-center">
                      <div className="flex items-center gap-4">
                        {i.item.image ? (
                          <img src={i.item.image} className="w-12 h-12 rounded-xl object-cover shrink-0" referrerPolicy="no-referrer" />
                        ) : (
                          <div className="w-12 h-12 rounded-xl bg-brand-sun/10 flex items-center justify-center text-brand-primary">
                            <Utensils size={20} />
                          </div>
                        )}
                        <div>
                          <p className="font-bold">{i.item.name}</p>
                          <p className="text-xs text-stone-400">{i.quantity} 份 × ${i.item.price}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        {useCoupon && i.item.id === highestPriceItem?.id ? (
                          <>
                            <span className="text-stone-400 line-through text-sm mr-2">${i.item.price}</span>
                            <span className="font-bold text-lg text-brand-primary">NT$49</span>
                            {i.quantity > 1 && <p className="text-xs text-stone-400">+ ${(i.quantity - 1) * i.item.price}</p>}
                          </>
                        ) : (
                          <span className="font-bold text-lg">${i.item.price * i.quantity}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="border-t border-stone-200 pt-8 space-y-4">
                  <div className="flex justify-between text-stone-500">
                    <span className="flex items-center gap-2"><Utensils size={16} /> 餐具需求</span>
                    <span className="font-bold text-stone-900 bg-white px-3 py-1 rounded-lg border border-stone-100">{needUtensils ? '需要' : '不需要'}</span>
                  </div>
                  {useCoupon && (
                    <div className="flex justify-between text-brand-primary">
                      <span className="flex items-center gap-2"><Star size={16} /> 優惠折抵 (首購體驗)</span>
                      <span className="font-bold">-${highestPriceItem ? highestPriceItem.price - 49 : 0}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-3xl font-bold pt-4 text-[#431407]">
                    <span>應付總計</span>
                    <span>${total}</span>
                  </div>
                </div>
              </div>

              <div className="mt-12 flex flex-col items-center gap-6">
                <p className="text-stone-400 text-sm italic">感謝您的訂購，我們正用心準備中...</p>
                <button onClick={resetOrder} className="flex items-center gap-2 text-stone-500 font-bold hover:text-brand-primary transition-colors group">
                  <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> 
                  返回首頁再次訂購
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="bg-white border-t border-stone-200 pt-20 pb-10 mt-auto">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center gap-3 mb-8">
              <Logo className="w-12 h-12" />
              <div>
                <h2 className="font-display text-2xl text-brand-dark">阿爸的家園</h2>
                <p className="text-xs text-stone-500 uppercase tracking-wider">Healthy Nutrition Center</p>
              </div>
            </div>
            <p className="text-stone-500 text-sm leading-relaxed">給家人吃的，當然要最好。<br />專業營養師調配，守護您每一餐的健康。</p>
          </div>
          <div><h6 className="font-bold mb-8 flex items-center gap-2"><Clock className="text-brand-primary" /> 營業時間</h6><p className="text-sm text-stone-600">週一至週五 07:30 - 11:30</p></div>
          <div><h6 className="font-bold mb-8 flex items-center gap-2"><MapPin className="text-brand-primary" /> 門市地址</h6><p className="text-sm text-stone-600">台北市大同區承德路一段23號一樓</p></div>
          <div><h6 className="font-bold mb-8 flex items-center gap-2"><Phone className="text-brand-primary" /> 聯絡電話</h6><p className="text-sm text-stone-600">0906-000-923 / 02-25236643</p></div>
        </div>
      </footer>

      <AnimatePresence>
        {isCartOpen && (
          <div className="fixed inset-0 z-50 flex justify-end">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsCartOpen(false)} className="absolute inset-0 bg-stone-900/40 backdrop-blur-sm" />
            <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} className="relative bg-white w-full max-w-md h-full shadow-2xl flex flex-col p-8">
              <div className="flex justify-between items-center mb-8"><h4 className="text-2xl font-bold flex items-center gap-3 text-brand-dark"><ShoppingCart className="text-brand-primary" /> 購物車</h4><button onClick={() => setIsCartOpen(false)}><X size={28} /></button></div>
              <div className="flex-grow overflow-y-auto space-y-8">
                {cart.length === 0 ? <div className="h-full flex flex-col items-center justify-center text-stone-400"><Utensils size={48} className="mb-4" /><p>購物車還是空的</p></div> : cart.map(i => (
                  <div key={i.item.id} className="flex gap-6 items-center">
                    {i.item.image ? (
                      <img src={i.item.image} className="w-16 h-16 rounded-2xl object-cover shrink-0" referrerPolicy="no-referrer" />
                    ) : (
                      <div className="w-16 h-16 rounded-2xl bg-brand-sun/10 flex items-center justify-center text-brand-primary shrink-0">
                        <Utensils size={24} />
                      </div>
                    )}
                    <div className="flex-grow">
                      <div className="flex justify-between mb-2"><h5 className="font-bold text-brand-dark">{i.item.name}</h5><button onClick={() => setCart(c => c.filter(x => x.item.id !== i.item.id))}><X size={20} /></button></div>
                      <div className="flex items-center gap-2 mb-4">
                        {useCoupon && i.item.id === highestPriceItem?.id ? (
                          <>
                            <span className="text-stone-400 line-through text-sm">${i.item.price}</span>
                            <span className="text-brand-primary font-bold">NT$49</span>
                          </>
                        ) : (
                          <span className="text-brand-primary font-bold">${i.item.price}</span>
                        )}
                      </div>
                      <div className="flex items-center gap-4"><button onClick={() => updateQuantity(i.item.id, -1)} className="w-8 h-8 rounded-full border hover:bg-brand-sun/10">-</button><span className="font-bold">{i.quantity}</span><button onClick={() => updateQuantity(i.item.id, 1)} className="w-8 h-8 rounded-full border hover:bg-brand-sun/10">+</button></div>
                    </div>
                  </div>
                ))}
              </div>
              {cart.length > 0 && (
                <div className="pt-8 border-t space-y-6">
                  <div className="flex justify-between text-2xl font-bold text-brand-dark"><span>總計</span><span>${total}</span></div>
                  <button onClick={startCheckout} className="w-full bg-brand-dark text-white font-bold py-5 rounded-3xl hover:bg-brand-primary transition-colors">前往結帳</button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {checkoutStep !== 'none' && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="relative bg-white rounded-[40px] shadow-2xl w-full max-w-md p-10 text-center">
              {checkoutStep === 'deliveryType' ? (
                <>
                  <Truck size={64} className="text-brand-primary mx-auto mb-8" />
                  <h4 className="text-3xl font-display mb-4 text-brand-dark">選擇取餐方式</h4>
                  <p className="text-stone-500 mb-10">請選擇您方便的取餐方式</p>
                  <div className="grid grid-cols-2 gap-4">
                    <button onClick={() => handleDeliveryTypeSelect('pickup')} className="py-6 rounded-3xl border-2 border-stone-100 hover:border-brand-primary hover:bg-brand-sun/10 flex flex-col items-center gap-2 font-bold transition-all text-brand-dark">
                      <HomeIcon size={24} /> 自取
                    </button>
                    <button onClick={() => handleDeliveryTypeSelect('delivery')} className="py-6 rounded-3xl border-2 border-stone-100 hover:border-brand-primary hover:bg-brand-sun/10 flex flex-col items-center gap-2 font-bold transition-all text-brand-dark">
                      <Truck size={24} /> 外送
                    </button>
                  </div>
                </>
              ) : checkoutStep === 'zoneCheck' ? (
                <>
                  <MapPin size={64} className={`mx-auto mb-8 ${getZone(userDistance) === 'red' ? 'text-red-500' : 'text-brand-leaf'}`} />
                  <h4 className="text-3xl font-display mb-4">配送範圍檢查</h4>
                  <p className="text-stone-500 mb-6">您的位置距離店鋪約 <span className="font-bold text-stone-900">{userDistance.toFixed(1)}km</span> <span className="text-[10px] block mt-1 text-stone-400">(Demo 模擬定位)</span></p>
                  
                  {getZone(userDistance) === 'green' && (
                    <div className="bg-brand-leaf/10 text-brand-leaf p-4 rounded-2xl font-bold mb-8">綠區：免運費！</div>
                  )}
                  {getZone(userDistance) === 'yellow' && (
                    <div className="bg-brand-sun/10 text-brand-dark p-4 rounded-2xl font-bold mb-8">
                      黃區：{cart.length >= 5 ? '已達 5 個便當，免運！' : '需滿 5 個便當或支付 $50 運費'}
                    </div>
                  )}
                  {getZone(userDistance) === 'red' && (
                    <div className="bg-red-50 text-red-600 p-4 rounded-2xl font-bold mb-8 flex items-center gap-2 justify-center">
                      <AlertTriangle size={18} /> 超出範圍，請改用外帶自取
                    </div>
                  )}

                  <div className="grid gap-4">
                    {getZone(userDistance) !== 'red' ? (
                      <button onClick={proceedAfterZone} className="w-full py-4 rounded-2xl bg-brand-primary text-white font-bold hover:bg-brand-dark transition-colors">確認配送</button>
                    ) : (
                      <button onClick={() => handleDeliveryTypeSelect('pickup')} className="w-full py-4 rounded-2xl bg-stone-900 text-white font-bold">改為自取</button>
                    )}
                    <button onClick={() => setCheckoutStep('none')} className="w-full py-4 rounded-2xl border font-bold">重新選擇</button>
                  </div>
                </>
              ) : checkoutStep === 'coupon' ? (
                <>
                  <CheckCircle2 size={64} className="text-brand-primary mx-auto mb-8" />
                  <h4 className="text-3xl font-display mb-4 text-brand-dark">是否使用優惠券？</h4>
                  <p className="text-stone-500 mb-10">您有一張 <span className="text-brand-primary font-bold">$49 體驗券</span> 尚未套用。</p>
                  <div className="grid grid-cols-2 gap-4">
                    <button onClick={() => { setUseCoupon(false); setCheckoutStep('utensils'); }} className="py-4 rounded-2xl border font-bold text-stone-600">直接結帳</button>
                    <button onClick={() => { setUseCoupon(true); setCheckoutStep('utensils'); }} className="py-4 rounded-2xl bg-brand-primary text-white font-bold hover:bg-brand-dark transition-colors">立即使用</button>
                  </div>
                </>
              ) : (
                <>
                  <Utensils size={64} className="text-brand-dark mx-auto mb-8" />
                  <h4 className="text-3xl font-display mb-4 text-brand-dark">需要餐具嗎？</h4>
                  <p className="text-stone-500 mb-10">響應環保，建議自備餐具。</p>
                  <div className="grid grid-cols-2 gap-4">
                    <button onClick={() => { setNeedUtensils(false); finalizeOrder(); }} className="py-4 rounded-2xl border font-bold text-stone-600">不需要</button>
                    <button onClick={() => { setNeedUtensils(true); finalizeOrder(); }} className="py-4 rounded-2xl bg-brand-dark text-white font-bold hover:bg-brand-primary transition-colors">需要</button>
                  </div>
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      {/* AI ChatBot Floating Button */}
      <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-4">
        <AnimatePresence>
          {isChatOpen && (
            <motion.div 
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              className="bg-white rounded-[32px] shadow-2xl w-[350px] sm:w-[400px] h-[500px] flex flex-col overflow-hidden border border-stone-100"
            >
              <div className="bg-brand-dark p-6 text-white flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-brand-primary rounded-full flex items-center justify-center">
                    <MessageSquare size={20} />
                  </div>
                  <div>
                    <p className="font-bold leading-none">智能客服</p>
                    <p className="text-[10px] opacity-70 mt-1">AI Assistant Online</p>
                  </div>
                </div>
                <button onClick={() => setIsChatOpen(false)} className="hover:bg-white/10 p-2 rounded-full transition-colors">
                  <X size={20} />
                </button>
              </div>
              
              <div className="flex-grow overflow-y-auto p-6 space-y-4 bg-stone-50">
                {chatMessages.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] p-4 rounded-2xl text-sm ${
                      msg.role === 'user' 
                        ? 'bg-brand-primary text-white rounded-tr-none' 
                        : 'bg-white text-brand-dark shadow-sm border border-stone-100 rounded-tl-none'
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
                {isChatLoading && (
                  <div className="flex justify-start">
                    <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm border border-stone-100">
                      <Loader2 size={18} className="animate-spin text-brand-primary" />
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>
              
              <div className="p-4 bg-white border-t border-stone-100">
                {/* Quick Actions */}
                <div className="flex gap-2 overflow-x-auto pb-3 mb-3 no-scrollbar">
                  {[
                    "📍 門市地址", "📞 聯絡電話", "🕒 營業時間", 
                    "🍱 推薦菜單", "✨ 三天窈窕體驗", "🛒 如何訂購"
                  ].map((action) => (
                    <button
                      key={action}
                      onClick={() => handleSendMessage(action)}
                      disabled={isChatLoading}
                      className="whitespace-nowrap px-3 py-1.5 bg-stone-100 hover:bg-brand-sun/20 text-stone-600 hover:text-brand-dark rounded-full text-xs font-bold transition-colors border border-stone-200"
                    >
                      {action}
                    </button>
                  ))}
                </div>

                <div className="flex gap-2">
                  <input 
                    type="text" 
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="輸入您的問題..."
                    className="flex-grow bg-stone-100 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-brand-primary transition-all"
                  />
                  <button 
                    onClick={() => handleSendMessage()}
                    disabled={isChatLoading}
                    className="bg-brand-dark text-white p-3 rounded-xl hover:bg-brand-primary transition-colors disabled:opacity-50"
                  >
                    <Send size={20} />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        <motion.button 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="bg-brand-primary text-white p-5 rounded-full shadow-2xl flex items-center justify-center relative group"
        >
          <MessageSquare size={28} />
          <span className="absolute right-full mr-4 bg-white text-brand-dark px-4 py-2 rounded-xl text-sm font-bold shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-stone-100">
            有問題問我吧！
          </span>
        </motion.button>
      </div>
    </div>
  );
}
