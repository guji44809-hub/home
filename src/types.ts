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
  // 1. 增肌減脂
  { 
    id: '1-1', category: '增肌減脂', name: '義式香草舒肥雞地瓜碗', price: 160, 
    nutrition: '低溫熟成雞胸保持軟嫩，搭配纖維豐富的黃金地瓜與季節溫沙拉。',
    pfc: { p: 35, f: 8, c: 45, cal: 392 },
    image: 'https://image.pollinations.ai/prompt/gourmet%20bento%20box%2C%20sliced%20herb%20chicken%20breast%2C%20roasted%20sweet%20potato%2C%20fresh%20greens%2C%20flat%20lay%2C%20top%20view%2C%20minimalist%2C%20light%20cream%20background%2C%20high-end%20food%20photography%2C%201%3A1%20aspect%20ratio?width=1024&height=1024&nologo=true'
  },
  { 
    id: '1-2', category: '增肌減脂', name: '青檸紙包鮮鱸五穀定食', price: 210, 
    nutrition: '以檸檬與香料紙包烘烤鱸魚，鎖住肉汁與 Omega-3，配上原味五穀飯。',
    pfc: { p: 28, f: 12, c: 50, cal: 420 },
    image: 'https://image.pollinations.ai/prompt/gourmet%20bento%20box%2C%20steamed%20sea%20bass%20with%20lemon%20slices%2C%20five-grain%20rice%2C%20steamed%20vegetables%2C%20flat%20lay%2C%20top%20view%2C%20minimalist%2C%20light%20cream%20background%2C%20high-end%20food%20photography%2C%201%3A1%20aspect%20ratio?width=1024&height=1024&nologo=true'
  },
  { 
    id: '1-3', category: '增肌減脂', name: '黑胡椒嫩煎牛排溫沙拉', price: 250, 
    nutrition: '選用低脂板腱牛排快速香煎，搭配大量葉菜與油醋醬，補充優質鐵質。',
    pfc: { p: 32, f: 15, c: 20, cal: 343 },
    image: 'https://image.pollinations.ai/prompt/gourmet%20bento%20box%2C%20seared%20beef%20steak%20slices%2C%20black%20pepper%2C%20warm%20salad%2C%20greens%2C%20flat%20lay%2C%20top%20view%2C%20minimalist%2C%20light%20cream%20background%2C%20high-end%20food%20photography%2C%201%3A1%20aspect%20ratio?width=1024&height=1024&nologo=true'
  },
  { 
    id: '1-4', category: '增肌減脂', name: '蒜香毛豆嫩雞高蛋白麵', price: 160, 
    nutrition: '以減醣蒟蒻麵為基底，拌入大量毛豆與雞絲，是極低熱量的飽腹首選。',
    pfc: { p: 28, f: 6, c: 15, cal: 226 },
    image: 'https://image.pollinations.ai/prompt/gourmet%20bento%20box%2C%20shredded%20chicken%20noodles%2C%20edamame%2C%20garlic%2C%20konjac%20noodles%2C%20flat%20lay%2C%20top%20view%2C%20minimalist%2C%20light%20cream%20background%2C%20high-end%20food%20photography%2C%201%3A1%20aspect%20ratio?width=1024&height=1024&nologo=true'
  },
  { 
    id: '1-5', category: '增肌減脂', name: '墨西哥辣味鮪魚藜麥碗', price: 170, 
    nutrition: '辛香料激發代謝，鮪魚提供純淨蛋白質，藜麥則帶來全營養氨基酸。',
    pfc: { p: 26, f: 9, c: 38, cal: 337 },
    image: 'https://image.pollinations.ai/prompt/gourmet%20bento%20box%2C%20spicy%20tuna%2C%20quinoa%20bowl%2C%20mexican%20spices%2C%20corn%2C%20beans%2C%20flat%20lay%2C%20top%20view%2C%20minimalist%2C%20light%20cream%20background%2C%20high-end%20food%20photography%2C%201%3A1%20aspect%20ratio?width=1024&height=1024&nologo=true'
  },
  { 
    id: '1-6', category: '增肌減脂', name: '香煎板豆腐與水煮蛋餐', price: 140, 
    nutrition: '雙重植物與動物蛋白組合，配上大量水煮青菜，適合嚴格熱量控制者。',
    pfc: { p: 22, f: 10, c: 12, cal: 226 },
    image: 'https://image.pollinations.ai/prompt/gourmet%20bento%20box%2C%20pan-fried%20tofu%2C%20boiled%20eggs%2C%20steamed%20vegetables%2C%20flat%20lay%2C%20top%20view%2C%20minimalist%2C%20light%20cream%20background%2C%20high-end%20food%20photography%2C%201%3A1%20aspect%20ratio?width=1024&height=1024&nologo=true'
  },

  // 2. 調整腸胃
  { 
    id: '2-1', category: '調整腸胃', name: '暖心味噌豆腐鮮菇盅', price: 140, 
    nutrition: '使用天然發酵味噌湯底，加入多種蕈菇與豆腐，豐富的膳食纖維助蠕動。',
    pfc: { p: 15, f: 6, c: 25, cal: 214 },
    image: 'https://image.pollinations.ai/prompt/gourmet%20miso%20soup%2C%20silken%20tofu%2C%20shiitake%20mushrooms%2C%20ceramic%20bowl%2C%20steaming%2C%20minimalist%2C%20light%20cream%20background%2C%20high-end%20food%20photography%2C%201%3A1%20aspect%20ratio?width=1024&height=1024&nologo=true'
  },
  { 
    id: '2-2', category: '調整腸胃', name: '藍莓奇亞籽希臘優格杯', price: 130, 
    nutrition: '濃縮希臘優格搭配抗氧化藍莓與吸水膨脹的奇亞籽，清理腸道負擔。',
    pfc: { p: 12, f: 9, c: 18, cal: 201 },
    image: 'https://image.pollinations.ai/prompt/gourmet%20greek%20yogurt%20parfait%2C%20fresh%20blueberries%2C%20chia%20seeds%2C%20glass%20cup%2C%20minimalist%2C%20light%20cream%20background%2C%20high-end%20food%20photography%2C%201%3A1%20aspect%20ratio?width=1024&height=1024&nologo=true'
  },
  { 
    id: '2-3', category: '調整腸胃', name: '秋葵山藥雞肉蕎麥冷麵', price: 170, 
    nutrition: '秋葵與山藥的植物黏液可保護胃壁，蕎麥麵則提供好消化的慢速醣類。',
    pfc: { p: 22, f: 5, c: 42, cal: 301 },
    image: 'https://image.pollinations.ai/prompt/gourmet%20soba%20noodles%2C%20okra%2C%20yam%2C%20chicken%20slices%2C%20cold%20noodles%2C%20flat%20lay%2C%20top%20view%2C%20minimalist%2C%20light%20cream%20background%2C%20high-end%20food%20photography%2C%201%3A1%20aspect%20ratio?width=1024&height=1024&nologo=true'
  },
  { 
    id: '2-4', category: '調整腸胃', name: '黃金泡菜里肌糙米飯', price: 165, 
    nutrition: '天然發酵的黃金泡菜含有活性乳酸菌，搭配油脂極少的豬里肌肉片。',
    pfc: { p: 26, f: 8, c: 48, cal: 368 },
    image: 'https://image.pollinations.ai/prompt/gourmet%20bento%20box%2C%20pork%20tenderloin%2C%20golden%20kimchi%2C%20brown%20rice%2C%20flat%20lay%2C%20top%20view%2C%20minimalist%2C%20light%20cream%20background%2C%20high-end%20food%20photography%2C%201%3A1%20aspect%20ratio?width=1024&height=1024&nologo=true'
  },
  { 
    id: '2-5', category: '調整腸胃', name: '鮮蔬蓮子芡實養生粥', price: 150, 
    nutrition: '以蓮子與芡實入粥，質地細緻綿密，溫潤補脾，適合腸胃虛弱時食用。',
    pfc: { p: 10, f: 3, c: 40, cal: 227 },
    image: 'https://image.pollinations.ai/prompt/gourmet%20congee%2C%20lotus%20seeds%2C%20fox%20nuts%2C%20vegetables%2C%20ceramic%20bowl%2C%20minimalist%2C%20light%20cream%20background%2C%20high-end%20food%20photography%2C%201%3A1%20aspect%20ratio?width=1024&height=1024&nologo=true'
  },
  { 
    id: '2-6', category: '調整腸胃', name: '清燉番茄洋蔥軟骨湯餐', price: 180, 
    nutrition: '番茄酸甜開胃，洋蔥具備天然益生元，軟骨則提供豐富膠質修復腸道。',
    pfc: { p: 20, f: 12, c: 15, cal: 248 },
    image: 'https://image.pollinations.ai/prompt/gourmet%20tomato%20soup%2C%20onion%2C%20pork%20cartilage%2C%20steaming%2C%20minimalist%2C%20light%20cream%20background%2C%20high-end%20food%20photography%2C%201%3A1%20aspect%20ratio?width=1024&height=1024&nologo=true'
  },

  // 3. 運動補充
  { 
    id: '3-1', category: '運動補充', name: '慢火烤豬里肌糙米增能餐', price: 180, 
    nutrition: '豬肉富含維生素 B1 可消除疲勞，糙米飯則提供運動後的肝醣回補。',
    pfc: { p: 30, f: 10, c: 55, cal: 430 },
    image: 'https://image.pollinations.ai/prompt/gourmet%20bento%20box%2C%20roasted%20pork%20tenderloin%2C%20brown%20rice%2C%20broccoli%2C%20flat%20lay%2C%20top%20view%2C%20minimalist%2C%20light%20cream%20background%2C%20high-end%20food%20photography%2C%201%3A1%20aspect%20ratio?width=1024&height=1024&nologo=true'
  },
  { 
    id: '3-2', category: '運動補充', name: '全麥牛肉時蔬能量捲餅', price: 150, 
    nutrition: '方便手拿食用的高蛋白捲餅，牛肉補充鋅元素，適合重訓後的快速補給。',
    pfc: { p: 25, f: 14, c: 35, cal: 366 },
    image: 'https://image.pollinations.ai/prompt/gourmet%20beef%20and%20vegetable%20wrap%2C%20whole%20wheat%20tortilla%2C%20fresh%20greens%2C%20minimalist%2C%20light%20cream%20background%2C%20high-end%20food%20photography%2C%201%3A1%20aspect%20ratio?width=1024&height=1024&nologo=true'
  },
  { 
    id: '3-3', category: '運動補充', name: '照燒雞腿紫米機能餐', price: 185, 
    nutrition: '去皮雞腿排搭配花青素豐富的紫米，提供持續且穩定的運動能量。',
    pfc: { p: 32, f: 12, c: 45, cal: 416 },
    image: 'https://image.pollinations.ai/prompt/gourmet%20bento%20box%2C%20teriyaki%20chicken%20thigh%2C%20purple%20rice%2C%20greens%2C%20flat%20lay%2C%20top%20view%2C%20minimalist%2C%20light%20cream%20background%2C%20high-end%20food%20photography%2C%201%3A1%20aspect%20ratio?width=1024&height=1024&nologo=true'
  },
  { 
    id: '3-4', category: '運動補充', name: '堅果碎鮮蝦通心粉沙拉', price: 200, 
    nutrition: '鮮蝦提供低脂蛋白，碎堅果補充優質油脂，通心粉則能快速轉換能量。',
    pfc: { p: 24, f: 16, c: 38, cal: 392 },
    image: 'https://image.pollinations.ai/prompt/gourmet%20pasta%20salad%2C%20shrimp%2C%20nuts%2C%20macaroni%2C%20fresh%20vegetables%2C%20flat%20lay%2C%20top%20view%2C%20minimalist%2C%20light%20cream%20background%2C%20high-end%20food%20photography%2C%201%3A1%20aspect%20ratio?width=1024&height=1024&nologo=true'
  },
  { 
    id: '3-5', category: '運動補充', name: '水煮豬心與紅豆紫米飯', price: 190, 
    nutrition: '傳統補元氣食材，豬心富含微量元素，紅豆能減緩運動後的肌肉痠痛。',
    pfc: { p: 28, f: 8, c: 50, cal: 384 },
    image: 'https://image.pollinations.ai/prompt/gourmet%20bento%20box%2C%20sliced%20pork%20heart%2C%20red%20bean%20purple%20rice%2C%20flat%20lay%2C%20top%20view%2C%20minimalist%2C%20light%20cream%20background%2C%20high-end%20food%20photography%2C%201%3A1%20aspect%20ratio?width=1024&height=1024&nologo=true'
  },
  { 
    id: '3-6', category: '運動補充', name: '香蕉花生醬全麥貝果餐', price: 140, 
    nutrition: '經典能量組合，香蕉的鉀離子預防抽筋，花生醬則提供飽足感與能量。',
    pfc: { p: 12, f: 18, c: 52, cal: 418 },
    image: 'https://image.pollinations.ai/prompt/gourmet%20whole%20wheat%20bagel%2C%20banana%20slices%2C%20peanut%20butter%2C%20minimalist%2C%20light%20cream%20background%2C%20high-end%20food%20photography%2C%201%3A1%20aspect%20ratio?width=1024&height=1024&nologo=true'
  },

  // 4. 孕期營養
  { 
    id: '4-1', category: '孕期營養', name: '挪威炙烤鮭魚藜麥養胎飯', price: 280, 
    nutrition: '厚切鮭魚富含 DHA 支援胎兒發育，藜麥提供懷孕所需的完整營養。',
    pfc: { p: 32, f: 18, c: 40, cal: 450 },
    image: 'https://image.pollinations.ai/prompt/gourmet%20bento%20box%2C%20grilled%20salmon%20fillet%2C%20quinoa%20rice%2C%20asparagus%2C%20flat%20lay%2C%20top%20view%2C%20minimalist%2C%20light%20cream%20background%2C%20high-end%20food%20photography%2C%201%3A1%20aspect%20ratio?width=1024&height=1024&nologo=true'
  },
  { 
    id: '4-2', category: '孕期營養', name: '鮮味蛤蜊燉雞紅莧菜餐', price: 250, 
    nutrition: '紅莧菜補鐵，蛤蜊與雞湯補鈣與氨基酸，是孕媽咪最平衡的滋補選擇。',
    pfc: { p: 38, f: 12, c: 30, cal: 380 },
    image: 'https://image.pollinations.ai/prompt/gourmet%20bento%20box%2C%20stewed%20chicken%20with%20clams%2C%20red%20amaranth%2C%20flat%20lay%2C%20top%20view%2C%20minimalist%2C%20light%20cream%20background%2C%20high-end%20food%20photography%2C%201%3A1%20aspect%20ratio?width=1024&height=1024&nologo=true'
  },
  { 
    id: '4-3', category: '孕期營養', name: '麻油龍膽石斑魚湯定食', price: 320, 
    nutrition: '龍膽石斑富含膠原蛋白，輕量麻油溫潤不燥，幫助孕期維持良好氣色。',
    pfc: { p: 35, f: 22, c: 25, cal: 438 },
    image: 'https://image.pollinations.ai/prompt/gourmet%20fish%20soup%2C%20giant%20grouper%2C%20sesame%20oil%2C%20ginger%2C%20steaming%2C%20minimalist%2C%20light%20cream%20background%2C%20high-end%20food%20photography%2C%201%3A1%20aspect%20ratio?width=1024&height=1024&nologo=true'
  },
  { 
    id: '4-4', category: '孕期營養', name: '黑豆烏骨雞精華溫補餐', price: 300, 
    nutrition: '烏骨雞與黑豆雙重補血，提供極高的氨基酸密度，強化母體抵抗力。',
    pfc: { p: 42, f: 14, c: 20, cal: 374 },
    image: 'https://image.pollinations.ai/prompt/gourmet%20bento%20box%2C%20black%20bone%20chicken%2C%20black%20beans%2C%20soup%2C%20flat%20lay%2C%20top%20view%2C%20minimalist%2C%20light%20cream%20background%2C%20high-end%20food%20photography%2C%201%3A1%20aspect%20ratio?width=1024&height=1024&nologo=true'
  },
  { 
    id: '4-5', category: '孕期營養', name: '菠菜起司歐姆蛋佐法棍', price: 180, 
    nutrition: '菠菜含有大量葉酸，搭配高鈣起司，適合當作營養滿分的孕期早午餐。',
    pfc: { p: 18, f: 22, c: 35, cal: 410 },
    image: 'https://image.pollinations.ai/prompt/gourmet%20omelette%2C%20spinach%2C%20cheese%2C%20baguette%20slices%2C%20minimalist%2C%20light%20cream%20background%2C%20high-end%20food%20photography%2C%201%3A1%20aspect%20ratio?width=1024&height=1024&nologo=true'
  },
  { 
    id: '4-6', category: '孕期營養', name: '核桃腰果煨煮五穀軟飯', price: 170, 
    nutrition: '堅果富含維生素 E 與鋅，煨煮成軟飯後更易吸收，守護母體抗氧化。',
    pfc: { p: 14, f: 20, c: 45, cal: 416 },
    image: 'https://image.pollinations.ai/prompt/gourmet%20five-grain%20porridge%2C%20walnuts%2C%20cashews%2C%20minimalist%2C%20light%20cream%20background%2C%20high-end%20food%20photography%2C%201%3A1%20aspect%20ratio?width=1024&height=1024&nologo=true'
  },

  // 5. 銀髮族
  { 
    id: '5-1', category: '銀髮族', name: '絲瓜蛤蜊滑豆腐軟食餐', price: 180, 
    nutrition: '絲瓜清甜好入口，豆腐與蛤蜊質地極軟，適合牙口不佳但需補蛋白質者。',
    pfc: { p: 20, f: 8, c: 20, cal: 232 },
    image: 'https://image.pollinations.ai/prompt/gourmet%20bento%20box%2C%20soft%20tofu%20with%20loofah%20and%20clams%2C%20gentle%20texture%2C%20flat%20lay%2C%20top%20view%2C%20minimalist%2C%20light%20cream%20background%2C%20high-end%20food%20photography%2C%201%3A1%20aspect%20ratio?width=1024&height=1024&nologo=true'
  },
  { 
    id: '5-2', category: '銀髮族', name: '深海魚片翡翠燕麥粥', price: 170, 
    nutrition: '以燕麥代替白米增加纖維，魚片去刺切薄，溫潤好吞嚥且營養密度高。',
    pfc: { p: 22, f: 6, c: 35, cal: 282 },
    image: 'https://image.pollinations.ai/prompt/gourmet%20fish%20fillet%20congee%2C%20spinach%2C%20oats%2C%20ceramic%20bowl%2C%20minimalist%2C%20light%20cream%20background%2C%20high-end%20food%20photography%2C%201%3A1%20aspect%20ratio?width=1024&height=1024&nologo=true'
  },
  { 
    id: '5-3', category: '銀髮族', name: '清蒸冬瓜獅子頭碎肉餐', price: 160, 
    nutrition: '獅子頭經細緻絞碎混合嫩豆腐清蒸，口感鬆軟，是補給肌肉的高齡餐。',
    pfc: { p: 24, f: 14, c: 15, cal: 282 },
    image: 'https://image.pollinations.ai/prompt/gourmet%20bento%20box%2C%20steamed%20meatballs%2C%20winter%20melon%2C%20soft%20texture%2C%20flat%20lay%2C%20top%20view%2C%20minimalist%2C%20light%20cream%20background%2C%20high-end%20food%20photography%2C%201%3A1%20aspect%20ratio?width=1024&height=1024&nologo=true'
  },
  { 
    id: '5-4', category: '銀髮族', name: '南瓜泥煨煮嫩雞絲定食', price: 155, 
    nutrition: '南瓜泥富含胡蘿蔔素護眼，雞絲切短後與南瓜一同煨煮，入口即化。',
    pfc: { p: 25, f: 7, c: 30, cal: 283 },
    image: 'https://image.pollinations.ai/prompt/gourmet%20bento%20box%2C%20shredded%20chicken%2C%20pumpkin%20puree%2C%20flat%20lay%2C%20top%20view%2C%20minimalist%2C%20light%20cream%20background%2C%20high-end%20food%20photography%2C%201%3A1%20aspect%20ratio?width=1024&height=1024&nologo=true'
  },
  { 
    id: '5-5', category: '銀髮族', name: '干貝蛋白蒸蛋佐嫩芽菜', price: 190, 
    nutrition: '選用高級干貝提鮮，純蛋白蒸蛋極低負擔，嫩芽菜纖維細緻易消化。',
    pfc: { p: 20, f: 4, c: 10, cal: 156 },
    image: 'https://image.pollinations.ai/prompt/gourmet%20steamed%20egg%20whites%2C%20scallops%2C%20sprouts%2C%20minimalist%2C%20light%20cream%20background%2C%20high-end%20food%20photography%2C%201%3A1%20aspect%20ratio?width=1024&height=1024&nologo=true'
  },
  { 
    id: '5-6', category: '銀髮族', name: '什錦燉煮高麗菜封肉', price: 175, 
    nutrition: '將蔬菜與瘦肉長時間慢火燉煮至徹底軟化，完整保留食物原味與精華。',
    pfc: { p: 28, f: 12, c: 18, cal: 292 },
    image: 'https://image.pollinations.ai/prompt/gourmet%20bento%20box%2C%20stewed%20pork%20with%20cabbage%2C%20soft%20texture%2C%20flat%20lay%2C%20top%20view%2C%20minimalist%2C%20light%20cream%20background%2C%20high-end%20food%20photography%2C%201%3A1%20aspect%20ratio?width=1024&height=1024&nologo=true'
  },

  // 6. 兒童長高
  { 
    id: '6-1', category: '兒童長高', name: '紅燒番茄嫩牛長高定食', price: 190, 
    nutrition: '牛肉的鋅是長高關鍵，酸甜番茄開胃，讓孩子自然攝取足夠成長動能。',
    pfc: { p: 28, f: 15, c: 45, cal: 427 },
    image: 'https://image.pollinations.ai/prompt/gourmet%20bento%20box%2C%20braised%20beef%20with%20tomatoes%2C%20steamed%20rice%2C%20flat%20lay%2C%20top%20view%2C%20minimalist%2C%20light%20cream%20background%2C%20high-end%20food%20photography%2C%201%3A1%20aspect%20ratio?width=1024&height=1024&nologo=true'
  },
  { 
    id: '6-2', category: '兒童長高', name: '起司彩椒雞丁烘蛋套餐', price: 160, 
    nutrition: '隱藏在烘蛋裡的彩椒能補充維生素，大量起司則是骨骼發育的鈣質來源。',
    pfc: { p: 24, f: 18, c: 15, cal: 318 },
    image: 'https://image.pollinations.ai/prompt/gourmet%20bento%20box%2C%20chicken%20and%20bell%20pepper%20frittata%2C%20melted%20cheese%2C%20flat%20lay%2C%20top%20view%2C%20minimalist%2C%20light%20cream%20background%2C%20high-end%20food%20photography%2C%201%3A1%20aspect%20ratio?width=1024&height=1024&nologo=true'
  },
  { 
    id: '6-3', category: '兒童長高', name: '芝麻淋醬鮮魚柳飯糰', price: 145, 
    nutrition: '黑芝麻鈣質是牛奶的數倍，去刺魚柳富含 DHA，可愛造型提升用餐興趣。',
    pfc: { p: 18, f: 12, c: 40, cal: 340 },
    image: 'https://image.pollinations.ai/prompt/gourmet%20bento%20box%2C%20onigiri%20rice%20balls%2C%20fish%20fillets%2C%20sesame%20sauce%2C%20cute%20shapes%2C%20flat%20lay%2C%20top%20view%2C%20minimalist%2C%20light%20cream%20background%2C%20high-end%20food%20photography%2C%201%3A1%20aspect%20ratio?width=1024&height=1024&nologo=true'
  },
  { 
    id: '6-4', category: '兒童長高', name: '牛奶燉南瓜嫩雞燉飯', price: 175, 
    nutrition: '以鮮乳代替鮮奶油燉煮，讓孩子在吃飯過程中就能攝取大量乳鈣。',
    pfc: { p: 22, f: 14, c: 42, cal: 382 },
    image: 'https://image.pollinations.ai/prompt/gourmet%20pumpkin%20risotto%2C%20chicken%2C%20creamy%2C%20minimalist%2C%20light%20cream%20background%2C%20high-end%20food%20photography%2C%201%3A1%20aspect%20ratio?width=1024&height=1024&nologo=true'
  },
  { 
    id: '6-5', category: '兒童長高', name: '迷你漢堡排佐花椰菜泥', price: 180, 
    nutrition: '自製純肉漢堡排搭配滑順的花椰菜泥，解決孩子不愛吃蔬菜的問題。',
    pfc: { p: 26, f: 16, c: 12, cal: 296 },
    image: 'https://image.pollinations.ai/prompt/gourmet%20bento%20box%2C%20mini%20beef%20patties%2C%20broccoli%20puree%2C%20flat%20lay%2C%20top%20view%2C%20minimalist%2C%20light%20cream%20background%2C%20high-end%20food%20photography%2C%201%3A1%20aspect%20ratio?width=1024&height=1024&nologo=true'
  },
  { 
    id: '6-6', category: '兒童長高', name: '蝦仁玉米滑蛋營養套餐', price: 165, 
    nutrition: '玉米與雞蛋含有葉黃素護眼，蝦仁提供彈性口感與優質發育蛋白。',
    pfc: { p: 24, f: 10, c: 25, cal: 286 },
    image: 'https://image.pollinations.ai/prompt/gourmet%20bento%20box%2C%20scrambled%20eggs%20with%20shrimp%20and%20corn%2C%20flat%20lay%2C%20top%20view%2C%20minimalist%2C%20light%20cream%20background%2C%20high-end%20food%20photography%2C%201%3A1%20aspect%20ratio?width=1024&height=1024&nologo=true'
  },
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  { id: 1, question: '每天一杯咖啡？', options: ['有', '不一定', '沒有'] },
  { id: 2, question: '平時注意身體保養嗎？', options: ['有', '有考慮', '沒有'] },
  { id: 3, question: '平時有運動習慣嗎？', options: ['有', '有考慮但缺伴', '沒時間'] },
  { id: 4, question: '想藉由飲食調整而改變體態嗎？', options: ['有', '有考慮但沒方法', '沒有'] },
];
