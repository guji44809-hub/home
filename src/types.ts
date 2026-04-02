export interface MenuItem {
  id: string;
  category: string;
  name: string;
  price: number;
  nutrition: string;
  pfc: { p: number; f: number; c: number; cal: number };
  image?: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
}

export const MENU_DATA: MenuItem[] = [
  { 
    id: '1-1', category: '增肌減脂', name: '義式香草舒肥雞地瓜能量碗', price: 160, 
    nutrition: '高蛋白雞胸、低 GI 澱粉（地瓜）',
    pfc: { p: 35, f: 8, c: 45, cal: 392 },
    image: 'https://image.pollinations.ai/prompt/gourmet%20bento%20box%2C%20sliced%20herb%20chicken%20breast%2C%20roasted%20sweet%20potato%2C%20fresh%20greens%2C%20flat%20lay%2C%20top%20view%2C%20minimalist%2C%20light%20cream%20background%2C%20high-end%20food%20photography%2C%201%3A1%20aspect%20ratio?width=1024&height=1024&nologo=true'
  },
  { 
    id: '1-2', category: '增肌減脂', name: '青檸紙包鮮鱸五穀定食', price: 210, 
    nutrition: '優質白肉魚、豐富 Omega-3',
    pfc: { p: 28, f: 12, c: 50, cal: 420 },
    image: 'https://image.pollinations.ai/prompt/gourmet%20bento%20box%2C%20steamed%20sea%20bass%20with%20lemon%20slices%2C%20five-grain%20rice%2C%20steamed%20vegetables%2C%20flat%20lay%2C%20top%20view%2C%20minimalist%2C%20light%20cream%20background%2C%20high-end%20food%20photography%2C%201%3A1%20aspect%20ratio?width=1024&height=1024&nologo=true'
  },
  { 
    id: '2-1', category: '調整腸胃', name: '暖心味噌豆腐鮮菇盅', price: 140, 
    nutrition: '發酵食益生菌、高纖維蕈菇',
    pfc: { p: 15, f: 6, c: 25, cal: 214 },
    image: 'https://image.pollinations.ai/prompt/gourmet%20miso%20soup%2C%20silken%20tofu%2C%20shiitake%20mushrooms%2C%20ceramic%20bowl%2C%20steaming%2C%20minimalist%2C%20light%20cream%20background%2C%20high-end%20food%20photography%2C%201%3A1%20aspect%20ratio?width=1024&height=1024&nologo=true'
  },
  { 
    id: '2-2', category: '調整腸胃', name: '藍莓奇亞籽希臘優格輕食杯', price: 130, 
    nutrition: '花青素、超級食物、幫助腸道好菌',
    pfc: { p: 12, f: 9, c: 18, cal: 201 },
    image: 'https://image.pollinations.ai/prompt/gourmet%20greek%20yogurt%20parfait%2C%20fresh%20blueberries%2C%20chia%20seeds%2C%20glass%20cup%2C%20minimalist%2C%20light%20cream%20background%2C%20high-end%20food%20photography%2C%201%3A1%20aspect%20ratio?width=1024&height=1024&nologo=true'
  },
  { 
    id: '3-1', category: '運動營養', name: '慢火烤豬里肌糙米增能餐', price: 180, 
    nutrition: '維生素 B1（修復肌肉）、複合碳水',
    pfc: { p: 30, f: 10, c: 55, cal: 430 },
    image: 'https://image.pollinations.ai/prompt/gourmet%20bento%20box%2C%20roasted%20pork%20tenderloin%2C%20brown%20rice%2C%20broccoli%2C%20flat%20lay%2C%20top%20view%2C%20minimalist%2C%20light%20cream%20background%2C%20high-end%20food%20photography%2C%201%3A1%20aspect%20ratio?width=1024&height=1024&nologo=true'
  },
  { 
    id: '3-2', category: '運動營養', name: '全麥牛肉時蔬能量捲餅', price: 150, 
    nutrition: '鐵質補充、方便運動前後快速食用',
    pfc: { p: 25, f: 14, c: 35, cal: 366 },
    image: 'https://image.pollinations.ai/prompt/gourmet%20beef%20and%20vegetable%20wrap%2C%20whole%20wheat%20tortilla%2C%20fresh%20greens%2C%20minimalist%2C%20light%20cream%20background%2C%20high-end%20food%20photography%2C%201%3A1%20aspect%20ratio?width=1024&height=1024&nologo=true'
  },
  { 
    id: '4-1', category: '孕期營養', name: '挪威炙烤鮭魚藜麥養胎飯', price: 280, 
    nutrition: 'DHA 腦部發育、藜麥全營養',
    pfc: { p: 32, f: 18, c: 40, cal: 450 },
    image: 'https://image.pollinations.ai/prompt/gourmet%20bento%20box%2C%20grilled%20salmon%20fillet%2C%20quinoa%20rice%2C%20asparagus%2C%20flat%20lay%2C%20top%20view%2C%20minimalist%2C%20light%20cream%20background%2C%20high-end%20food%20photography%2C%201%3A1%20aspect%20ratio?width=1024&height=1024&nologo=true'
  },
  { 
    id: '4-2', category: '孕期營養', name: '鮮味蛤蜊燉雞紅莧菜餐', price: 250, 
    nutrition: '高鐵、高鈣、產前滋補強身',
    pfc: { p: 38, f: 12, c: 30, cal: 380 },
    image: 'https://image.pollinations.ai/prompt/gourmet%20bento%20box%2C%20stewed%20chicken%20with%20clams%2C%20red%20amaranth%2C%20flat%20lay%2C%20top%20view%2C%20minimalist%2C%20light%20cream%20background%2C%20high-end%20food%20photography%2C%201%3A1%20aspect%20ratio?width=1024&height=1024&nologo=true'
  },
  { 
    id: '5-1', category: '銀髮族', name: '絲瓜蛤蜊滑豆腐軟食餐', price: 180, 
    nutrition: '質地軟嫩好入口、易消化蛋白',
    pfc: { p: 20, f: 8, c: 20, cal: 232 },
    image: 'https://image.pollinations.ai/prompt/gourmet%20bento%20box%2C%20soft%20tofu%20with%20loofah%20and%20clams%2C%20gentle%20texture%2C%20flat%20lay%2C%20top%20view%2C%20minimalist%2C%20light%20cream%20background%2C%20high-end%20food%20photography%2C%201%3A1%20aspect%20ratio?width=1024&height=1024&nologo=true'
  },
  { 
    id: '5-2', category: '銀髮族', name: '深海魚片翡翠燕麥粥', price: 170, 
    nutrition: '溫潤暖胃、高營養密度、好吞嚥',
    pfc: { p: 22, f: 6, c: 35, cal: 282 },
    image: 'https://image.pollinations.ai/prompt/gourmet%20fish%20fillet%20congee%2C%20spinach%2C%20oats%2C%20ceramic%20bowl%2C%20minimalist%2C%20light%20cream%20background%2C%20high-end%20food%20photography%2C%201%3A1%20aspect%20ratio?width=1024&height=1024&nologo=true'
  },
  { 
    id: '6-1', category: '兒童長高', name: '紅燒番茄嫩牛長高定食', price: 190, 
    nutrition: '關鍵鋅與鐵、搭配茄紅素吸收',
    pfc: { p: 28, f: 15, c: 45, cal: 427 },
    image: 'https://image.pollinations.ai/prompt/gourmet%20bento%20box%2C%20braised%20beef%20with%20tomatoes%2C%20steamed%20rice%2C%20flat%20lay%2C%20top%20view%2C%20minimalist%2C%20light%20cream%20background%2C%20high-end%20food%20photography%2C%201%3A1%20aspect%20ratio?width=1024&height=1024&nologo=true'
  },
  { 
    id: '6-2', category: '兒童長高', name: '起司彩椒雞丁烘蛋套餐', price: 160, 
    nutrition: '高鈣起司、多樣維生素均衡發育',
    pfc: { p: 24, f: 18, c: 15, cal: 318 },
    image: 'https://image.pollinations.ai/prompt/gourmet%20bento%20box%2C%20chicken%20and%20bell%20pepper%20frittata%2C%20melted%20cheese%2C%20flat%20lay%2C%20top%20view%2C%20minimalist%2C%20light%20cream%20background%2C%20high-end%20food%20photography%2C%201%3A1%20aspect%20ratio?width=1024&height=1024&nologo=true'
  },
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  { id: 1, question: '每天一杯咖啡？', options: ['有', '不一定', '沒有'] },
  { id: 2, question: '平時注意身體保養嗎？', options: ['有', '有考慮', '沒有'] },
  { id: 3, question: '平時有運動習慣嗎？', options: ['有', '有考慮但缺伴', '沒時間'] },
  { id: 4, question: '想藉由飲食調整而改變體態嗎？', options: ['有', '有考慮但沒方法', '沒有'] },
];
