export interface Model {
    id: string
    name: string
    category: string
    image: string
    slug: string
    height?: string
    measurements?: string
}

export const femaleFashionModels: Model[] = [
    { id: "1", name: "Adele C", category: "Fashion", image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80", slug: "adele-c" },
    { id: "2", name: "Ashlynn K", category: "Fashion", image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=800&q=80", slug: "ashlynn-k" },
    { id: "3", name: "Cassidy L", category: "Fashion", image: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=800&q=80", slug: "cassidy-l" },
    { id: "4", name: "Dierra P", category: "Fashion", image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&q=80", slug: "dierra-p" },
    { id: "5", name: "Elida G", category: "Fashion", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80", slug: "elida-g" },
    { id: "6", name: "Elyse H", category: "Fashion", image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&q=80", slug: "elyse-h" },
    { id: "7", name: "Emma Q", category: "Fashion", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=80", slug: "emma-q" },
    { id: "8", name: "Grace M", category: "Fashion", image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&q=80", slug: "grace-m" },
    { id: "9", name: "Haley F", category: "Fashion", image: "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=800&q=80", slug: "haley-f" },
    { id: "10", name: "Hannah B", category: "Fashion", image: "https://images.unsplash.com/photo-1496440737103-cd596325d314?w=800&q=80", slug: "hannah-b" },
    { id: "11", name: "Jacee M", category: "Fashion", image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=800&q=80", slug: "jacee-m" },
    { id: "12", name: "Katie W", category: "Fashion", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&q=80", slug: "katie-w" },
]

export const femaleCommercialModels: Model[] = [
    { id: "1", name: "Amanda R", category: "Commercial", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800&q=80", slug: "amanda-r" },
    { id: "2", name: "Brittany S", category: "Commercial", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&q=80", slug: "brittany-s" },
    { id: "3", name: "Chelsea T", category: "Commercial", image: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=800&q=80", slug: "chelsea-t" },
    { id: "4", name: "Diana M", category: "Commercial", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80", slug: "diana-m" },
    { id: "5", name: "Elena V", category: "Commercial", image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=800&q=80", slug: "elena-v" },
    { id: "6", name: "Fiona L", category: "Commercial", image: "https://images.unsplash.com/photo-1464863979621-258859e62245?w=800&q=80", slug: "fiona-l" },
    { id: "7", name: "Gloria K", category: "Commercial", image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=800&q=80", slug: "gloria-k" },
    { id: "8", name: "Holly N", category: "Commercial", image: "https://images.unsplash.com/photo-1499557354967-2b2d8910bcca?w=800&q=80", slug: "holly-n" },
]

export const femaleClassicModels: Model[] = [
    { id: "1", name: "Irene B", category: "Classic", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=80", slug: "irene-b" },
    { id: "2", name: "Janet P", category: "Classic", image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=800&q=80", slug: "janet-p" },
    { id: "3", name: "Karen W", category: "Classic", image: "https://images.unsplash.com/photo-1548142813-c348350df52b?w=800&q=80", slug: "karen-w" },
    { id: "4", name: "Linda H", category: "Classic", image: "https://images.unsplash.com/photo-1546961342-ea5f71b193f3?w=800&q=80", slug: "linda-h" },
    { id: "5", name: "Margaret C", category: "Classic", image: "https://images.unsplash.com/photo-1552699611-e2c208d5d9cf?w=800&q=80", slug: "margaret-c" },
    { id: "6", name: "Nancy D", category: "Classic", image: "https://images.unsplash.com/photo-1557862921-37829c790f19?w=800&q=80", slug: "nancy-d" },
]

export const maleFashionModels: Model[] = [
    { id: "1", name: "Alexander M", category: "Fashion", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&q=80", slug: "alexander-m" },
    { id: "2", name: "Brandon T", category: "Fashion", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&q=80", slug: "brandon-t" },
    { id: "3", name: "Christian L", category: "Fashion", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80", slug: "christian-l" },
    { id: "4", name: "Daniel K", category: "Fashion", image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=800&q=80", slug: "daniel-k" },
    { id: "5", name: "Ethan R", category: "Fashion", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&q=80", slug: "ethan-r" },
    { id: "6", name: "Felix G", category: "Fashion", image: "https://images.unsplash.com/photo-1488161628813-04466f0bb8b6?w=800&q=80", slug: "felix-g" },
    { id: "7", name: "Gabriel S", category: "Fashion", image: "https://images.unsplash.com/photo-1480429370612-2cd0c2f04a07?w=800&q=80", slug: "gabriel-s" },
    { id: "8", name: "Henry W", category: "Fashion", image: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=800&q=80", slug: "henry-w" },
]

export const maleCommercialModels: Model[] = [
    { id: "1", name: "Ian J", category: "Commercial", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80", slug: "ian-j" },
    { id: "2", name: "Jack M", category: "Commercial", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&q=80", slug: "jack-m" },
    { id: "3", name: "Kevin P", category: "Commercial", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&q=80", slug: "kevin-p" },
    { id: "4", name: "Lucas B", category: "Commercial", image: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=800&q=80", slug: "lucas-b" },
    { id: "5", name: "Marcus D", category: "Commercial", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&q=80", slug: "marcus-d" },
    { id: "6", name: "Nathan H", category: "Commercial", image: "https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=800&q=80", slug: "nathan-h" },
]

export const maleClassicModels: Model[] = [
    { id: "1", name: "Oliver T", category: "Classic", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&q=80", slug: "oliver-t" },
    { id: "2", name: "Patrick S", category: "Classic", image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=800&q=80", slug: "patrick-s" },
    { id: "3", name: "Quincy R", category: "Classic", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&q=80", slug: "quincy-r" },
    { id: "4", name: "Robert L", category: "Classic", image: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=800&q=80", slug: "robert-l" },
]

export const childrenMaleModels: Model[] = [
    { id: "1", name: "Aiden C", category: "Children", image: "https://images.unsplash.com/photo-1519340241574-2cec6aef0c01?w=800&q=80", slug: "aiden-c" },
    { id: "2", name: "Benjamin F", category: "Children", image: "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=800&q=80", slug: "benjamin-f" },
    { id: "3", name: "Charlie M", category: "Children", image: "https://images.unsplash.com/photo-1595074475609-88c0c3c47d28?w=800&q=80", slug: "charlie-m" },
    { id: "4", name: "Dylan R", category: "Children", image: "https://images.unsplash.com/photo-1588710920458-e6e8c40cd0fa?w=800&q=80", slug: "dylan-r" },
    { id: "5", name: "Elijah T", category: "Children", image: "https://images.unsplash.com/photo-1566004100631-35d015d6a491?w=800&q=80", slug: "elijah-t" },
    { id: "6", name: "Finn W", category: "Children", image: "https://images.unsplash.com/photo-1545696563-9f82a0bb919c?w=800&q=80", slug: "finn-w" },
]

export const childrenFemaleModels: Model[] = [
    { id: "1", name: "Ava B", category: "Children", image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&q=80", slug: "ava-b" },
    { id: "2", name: "Bella S", category: "Children", image: "https://images.unsplash.com/photo-1518826778770-a729fb53327c?w=800&q=80", slug: "bella-s" },
    { id: "3", name: "Chloe D", category: "Children", image: "https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c?w=800&q=80", slug: "chloe-d" },
    { id: "4", name: "Daisy G", category: "Children", image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&q=80", slug: "daisy-g" },
    { id: "5", name: "Emily K", category: "Children", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=80", slug: "emily-k" },
    { id: "6", name: "Faith L", category: "Children", image: "https://images.unsplash.com/photo-1518826778770-a729fb53327c?w=800&q=80", slug: "faith-l" },
]

export const childrenTweenModels: Model[] = [
    { id: "1", name: "Grace H", category: "Tween", image: "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=800&q=80", slug: "grace-h" },
    { id: "2", name: "Hunter J", category: "Tween", image: "https://images.unsplash.com/photo-1519340241574-2cec6aef0c01?w=800&q=80", slug: "hunter-j" },
    { id: "3", name: "Isabella P", category: "Tween", image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&q=80", slug: "isabella-p" },
    { id: "4", name: "James M", category: "Tween", image: "https://images.unsplash.com/photo-1545696563-9f82a0bb919c?w=800&q=80", slug: "james-m" },
    { id: "5", name: "Kylie R", category: "Tween", image: "https://images.unsplash.com/photo-1518826778770-a729fb53327c?w=800&q=80", slug: "kylie-r" },
    { id: "6", name: "Liam S", category: "Tween", image: "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=800&q=80", slug: "liam-s" },
]
