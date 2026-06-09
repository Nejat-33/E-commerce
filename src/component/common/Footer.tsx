import { useEffect, useState } from 'react'
import { Getproduct } from './products'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { faFacebook, faInstagram, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Globe, MapPin, Phone } from 'lucide-react'
function Footer() {
    const [category, setcategory] = useState<string[]>([])
    const support = ['Shipping Policy', 'Return & Exchange', 'Size Guide', 'Track Order', 'FAQS']
    const company = ['Our Story', 'Sustainability', 'Careers', 'Press', 'Store Locator']
    const contact = [
        { icon: MapPin, lable: 'Future city, FC 2046' },
        { icon: Phone, lable: '+1(555) 000-TECH' },
        { icon: Globe, lable: 'WWW.novacore.com' }
    ]
    const payments = [
        { name: 'Mastercard', url: 'https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg' },
        { name: 'PayPal', url: 'https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg' },
        { name: 'Visa', url: 'https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg' }
    ];

    useEffect(() => {
        const get = async () => {
            try {
                const data = await Getproduct()
                const uniquecategory = [...new Set(data.map(p => p.category))]
                setcategory(uniquecategory)
            }
            catch (error) {
                console.error('error happen in fetching data');
            }
        }
        get()
    }, [])

    console.log("category data", category);


    return (
        <footer className="bg-white text-black dark:text-white dark:bg-slate-900/50 backdrop-blur-md border-t border-white/5 pt-20 pb-10">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">

                    {/* Branding Column */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                                <FontAwesomeIcon icon={faCartShopping} className="text-white" />
                            </div>
                            <span className="text-xl font-black text-slate-900 dark:text-white tracking-tighter uppercase">Nova<span className="text-indigo-500">Core</span></span>
                        </div>
                        <p className="text-sm text-slate-500 leading-relaxed">
                            Architecting the future of human exterior through digital fabrication.
                        </p>
                    </div>


                    <div className="space-y-6">
                        <h4 className="text-slate-900 dark:text-white font-bold text-xs uppercase tracking-[0.2em] border-l-2 border-indigo-500 pl-3">Shop</h4>
                        <div className="flex flex-col space-y-3">
                            {category.map((cat, i) => (
                                <a key={i} href="#" className="group text-slate-500 capitalize hover:text-indigo-400 transition-all flex items-center">
                                    <span className="w-0 group-hover:w-3 h-[1px] bg-indigo-500 mr-0 group-hover:mr-2 transition-all"></span>
                                    {cat}
                                </a>
                            ))}
                        </div>
                    </div>


                    <div className="space-y-6">
                        <h4 className="text-slate-900 dark:text-white  font-bold text-xs uppercase tracking-[0.2em] border-l-2 border-indigo-500 pl-3">Support</h4>
                        <div className="flex flex-col space-y-3">
                            {support.map((item, i) => (
                                <a key={i} href="#" className="group text-slate-500 hover:text-indigo-400 transition-all flex items-center">
                                    <span className="w-0 group-hover:w-3 h-[1px] bg-indigo-500 mr-0 group-hover:mr-2 transition-all"></span>
                                    {item}
                                </a>
                            ))}
                        </div>
                    </div>


                    <div className="space-y-6">
                        <h4 className="text-slate-900 dark:text-white  font-bold text-xs uppercase tracking-[0.2em] border-l-2 border-indigo-500 pl-3">Contact</h4>
                        <div className="space-y-4">
                            {contact.map((item, i) => (
                                <div key={i} className="flex items-center gap-3 group cursor-pointer">
                                    <div className="w-8 h-8 rounded bg-gray-200 dark:bg-slate-800 flex items-center justify-center group-hover:bg-indigo-600  transition-colors">
                                        <item.icon size={14} className="text-slate-900 dark:text-white  group-hover:text-white" />
                                    </div>
                                    <span className="text-xs text-slate-500 group-hover:text-slate-300 transition-colors">{item.lable}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-6">
                        <h4 className="text-slate-900 dark:text-white  font-bold text-xs uppercase tracking-[0.2em] border-l-2 border-indigo-500 pl-3">Payments</h4>
                        <div className="grid grid-cols-2 gap-2">
                            {payments.map((p, i) => (
                                <div key={i} className="bg-white/30 dark:bg-slate-600 p-2 rounded-lg flex items-center justify-center  transition-colors cursor-pointer border border-white/5">
                                    <img src={p.url} alt={p.name} className="h-4 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all" />
                                </div>
                            ))}
                        </div>
                    </div>

                </div>

                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-[10px] text-slate-600 font-bold tracking-widest uppercase">
                        © 2046 NovaCore Digital Fabrication
                    </p>
                    <div className="flex gap-6">
                        <FontAwesomeIcon icon={faFacebook} className="text-slate-600 hover:text-white cursor-pointer transition-colors" />
                        <FontAwesomeIcon icon={faInstagram} className="text-slate-600 hover:text-white cursor-pointer transition-colors" />
                        <FontAwesomeIcon icon={faTwitter} className="text-slate-600 hover:text-white cursor-pointer transition-colors" />
                        <FontAwesomeIcon icon={faYoutube} className="text-slate-600 hover:text-white cursor-pointer transition-colors" />
                    </div>
                </div>
            </div>
        </footer>

    )
}

export default Footer
