import { faApple, faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons"
import { faArrowRight, faCartShopping, faEnvelope } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { ShieldCheck, User } from "lucide-react"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

type form = {
    username: string;
    password: string;
    email: string
}
type Usertype = {
    email: string
    password: string
}

type error = {
    usernameerror: string;
    passworderror: string;
    emailerror: string;
}

type rule = {
    hasUpper: boolean;
    hasLower: boolean;
    hasNumber: boolean;
    hasSpecial: boolean;
    hasLength: boolean;
}

type touched = {
    username: boolean;
    email: boolean;
    password: boolean;
}


function Registration() {
    const [form, setform] = useState<form>({ username: '', email: '', password: '' })
    const [error, seterror] = useState<error>({ usernameerror: '', passworderror: '', emailerror: '' })
    const [rule, setrule] = useState<rule>({ hasUpper: false, hasLower: false, hasNumber: false, hasLength: false, hasSpecial: false })
    const [success, setsuccess] = useState<string>('')

    const [touched, settouched] = useState<touched>({
        username: false,
        email: false,
        password: false
    })
    const existinguser = localStorage.getItem('registered_users')
    const alluser: Usertype[] = existinguser ? JSON.parse(existinguser) : []


    const validate = (): boolean => {
        let newerror = { usernameerror: '', passworderror: '', emailerror: '' }
        if (!form.username.trim()) {
            newerror.usernameerror = 'Username is required';
        }
        if (!form.email.trim()) {
            newerror.emailerror = 'Email is required'
        } else if (!form.email.includes('@')) {
            newerror.emailerror = 'Email must be valid'
        }

        if (!form.password.trim()) {
            newerror.passworderror = "Password required"
        }
        const passwordrule = {
            hasUpper: /[A-Z]/.test(form.password), hasLower: /[a-z]/.test(form.password),
            hasNumber: /[0-9]/.test(form.password), hasLength: form.password.length >= 8,
            hasSpecial: /[^A-Za-z0-9]/.test(form.password)
        }
        setrule(passwordrule)
        const allrulespassed = Object.values(passwordrule).every((value) => value === true)
        if (!allrulespassed) {
            newerror.passworderror = 'Password Must Meet all requirment'
        }

        seterror(newerror)

        return Object.values(newerror).every(er => er === '')
    }

    const handlepasswordchange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value
        setform({ ...form, password: val })
        setrule({
            hasUpper: /[A-Z]/.test(val),
            hasLower: /[a-z]/.test(val),
            hasNumber: /[0-9]/.test(val),
            hasLength: val.length >= 8,
            hasSpecial: /[^A-Za-z0-9]/.test(val)
        })
    }

    const handlesubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (validate()) {
            const existinguser = localStorage.getItem('registered_users')
            const alluser: form[] = existinguser ? JSON.parse(existinguser) : []

            const userExists = alluser.some(u => u.email === form.email);
            if (userExists) {
                seterror(prev => ({ ...prev, emailerror: "Email already registered!" }));
                return;
            }

            const updatedUsers = [...alluser, form];

            localStorage.setItem("registered_users", JSON.stringify(updatedUsers));
            setsuccess('successfully registered')
            setform({ email: '', password: '', username: '' })
            settouched({
                email: false,
                username: false,
                password: false
            })
            setrule({
                hasLength: false,
                hasSpecial: false,
                hasLower: false,
                hasNumber: false,
                hasUpper: false
            })
            setTimeout(() => setsuccess(''), 3000)
        } else {
            settouched({ username: true, password: true, email: true })
            console.log("Form has errors, registration stopped.");
        }
    }

    useEffect(() => {
        validate()
    }, [form])

    return (
        <div className="flex flex-col gap-4 p-10 bg-white border border-gray-100 rounded-3xl shadow-2xl my-5 lg:mx-[30%] ">
            <div className='flex items-center justify-center text-3xl'>
                <span className="text-white rounded-lg p-1.5 mr-2 bg-linear-to-br from-indigo-500 to-purple-400 shadow-lg shadow-indigo-400/20">
                    <FontAwesomeIcon icon={faCartShopping} />
                </span>
                <span className='font-bold dark:text-white text-slate-900'>NOVA<span className='text-indigo-600'>CORE</span></span>
            </div>

            <div className="space-y-2 text-center">
                <p className="font-black text-2xl tracking-wide">Create Account</p>
                <p className="text-gray-400 text-xs">Join the NovaCore network today</p>
            </div>

            <div>

            </div>
            <div className="flex flex-col gap-8">

                <form onSubmit={handlesubmit} action="">
                    <div className="text-sm text-gray-400 flex flex-col gap-3">
                        <span className="relative flex flex-col gap-2">
                            <span className="text-xs">Full Name</span>
                            <input type="text" name="username" value={form.username} onChange={(e) => { setform({ ...form, [e.target.name]: e.target.value }); settouched({ ...touched, username: true }) }}
                                onBlur={() => settouched({ ...touched, username: true })}
                                placeholder="Enter your Name"
                                className={`outline-none ${error.usernameerror && touched.username ? 'focus:border-red-600 focus:ring-red-600 border-red-600' : 'focus:border-indigo-600 focus:ring-indigo-600 border-indigo-600'} focus:ring-1  bg-gray-100 px-10 py-4 rounded-2xl`} />
                            <User size={19} className="absolute top-[40%] left-3.5" />
                            {touched.username && error.usernameerror && (
                                <p className="text-red-600 text-xs">{error.usernameerror}</p>
                            )}
                        </span>

                        <span className="relative text-sm text-gray-400 flex flex-col gap-3">
                            <span className="text-xs">Email Address</span>
                            <FontAwesomeIcon icon={faEnvelope} className="absolute top-[40%] text-lg left-3.5" />
                            <input type="text" name="email" value={form.email} onChange={(e) => { setform({ ...form, [e.target.name]: e.target.value }); settouched({ ...touched, email: true }) }}
                                onBlur={() => settouched({ ...touched, email: true })}
                                placeholder="Enter your email"
                                className={` py-4 px-11 bg-gray-100 rounded-2xl outline-none ${error.emailerror && touched.email ? 'focus:border-red-600 focus:ring-red-600 border-red-600' : 'focus:border-indigo-600 focus:ring-indigo-600 border-indigo-600'} focus:border-blue-600 focus:ring-1 focus:ring-blue-600`} />
                            {touched.email && error.emailerror && (
                                <p className="text-red-600 text-xs">{error.emailerror}</p>
                            )}
                        </span>

                        <span className="relative flex flex-col gap-3">
                            <span className="text-xs">Password</span>
                            <input type="password" name="password" onChange={(e) => { settouched({ ...touched, password: true }); handlepasswordchange(e) }} value={form.password}
                                onBlur={() => settouched({ ...touched, password: true })}
                                placeholder="Enter your Password"
                                className={`outline-none  focus:ring-1 bg-gray-100 px-10 py-4 ${touched.password && error.passworderror ? 'focus:border-red-600 focus:ring-red-600' : 'focus:border-blue-600 focus:ring-blue-600'} rounded-2xl`} />
                            <ShieldCheck size={19} className="absolute top-[20%] left-3.5" />
                            {touched.password && error.passworderror && (
                                <p className="text-red-600 text-xs">{error.passworderror}</p>
                            )}
                            <div className=" bg-indigo-50 p-4 space-y-3 rounded-2xl">
                                <span className="text-indigo-800 text-xs flex gap-1"><ShieldCheck size={16} /> SECURITY REUIREMENTS</span>
                                <div className="grid grid-cols-2 gap-2">
                                    <li className={`flex items-center gap-3 text-xs transition-colors duration-200 ${rule.hasLength ? 'text-indigo-600' : 'text-gray-400'
                                        }`}>
                                        <div className={`flex h-3 w-3 items-center justify-center rounded-full outline  outline-offset-1 ${rule.hasLength ? 'outline-indigo-600' : 'outline-gray-300'
                                            }`}>
                                            <span className={`h-2 w-2 rounded-full transition-all ${rule.hasLength ? 'bg-indigo-600 scale-100' : 'bg-transparent scale-0'
                                                }`} />
                                        </div>

                                        <span>8+ Characters</span>
                                    </li>
                                    <li className={`flex items-center gap-3 text-xs transition-colors duration-200 ${rule.hasSpecial ? 'text-indigo-600' : 'text-gray-400'}`}>
                                        <div className={`flex h-3 w-3 items-center justify-center rounded-full outline outline-offset-1 ${rule.hasSpecial ? 'outline-indigo-600' : 'outline-gray-300'}`}>
                                            <span className={`h-2 w-2 rounded-full transition-all ${rule.hasSpecial ? 'bg-indigo-600 scale-100' : 'bg-transparent scale-0'}`} />
                                        </div>

                                        <span>One Special Character</span>
                                    </li>
                                    <li className={`flex items-center gap-3 text-xs transition-colors duration-200 ${rule.hasUpper ? 'text-indigo-600' : 'text-gray-400'}`}>
                                        <div className={`flex h-3 w-3 items-center justify-center rounded-full outline  outline-offset-1 ${rule.hasUpper ? 'outline-indigo-600' : 'outline-gray-300'}`}>
                                            <span className={`h-2 w-2 rounded-full transition-all ${rule.hasUpper ? 'bg-indigo-600 scale-100' : 'bg-transparent scale-0'}`} />
                                        </div>
                                        <span>One Uppercase</span>
                                    </li>
                                    <li className={`flex items-center gap-3 text-xs transition-colors duration-200 ${rule.hasLower ? 'text-indigo-600' : 'text-gray-400'}`}>
                                        <div className={`flex h-3 w-3 items-center justify-center rounded-full outline  outline-offset-1 ${rule.hasLower ? 'outline-indigo-600' : 'outline-gray-300'}`}>
                                            <span className={`h-2 w-2 rounded-full transition-all ${rule.hasLower ? 'bg-indigo-600 scale-100' : 'bg-transparent scale-0'}`} />
                                        </div>

                                        <span>One Lowercase</span>
                                    </li>
                                    <li className={`flex items-center gap-3 text-xs transition-colors duration-200 ${rule.hasNumber ? 'text-indigo-600' : 'text-gray-400'}`}>
                                        <div className={`flex h-3 w-3 items-center justify-center rounded-full outline outline-offset-1 ${rule.hasNumber ? 'outline-indigo-600' : 'outline-gray-300'}`}>
                                            <span className={`h-2 w-2 rounded-full transition-all ${rule.hasNumber ? 'bg-indigo-600 scale-100' : 'bg-transparent scale-0'}`} />
                                        </div>
                                        <span>One Number</span>
                                    </li>
                                </div>
                            </div>
                        </span>
                    </div>

                    <button type="submit" className="flex w-full mt-5 items-center justify-center py-4 text-white rounded-2xl bg-indigo-600 hover:bg-indigo-500 gap-3 group transition-all duration-500">Sign Up<FontAwesomeIcon icon={faArrowRight} className="group-hover:translate-x-2.5 transition-all duration-500" /></button>
                    {success && (
                        <span className="text-green-500 text-sm capitalize inline-block mt-4 text-center  bg-linear-to-br from-green-50 via-green-100 to-green-50 py-3 w-full rounded-lg">{success}</span>
                    )}
                </form>

                <div className="flex items-center justify-between gap-2 text-gray-400 text-xs w-full">
                    <span className="w-1/3 h-[1px] bg-gray-200"></span>
                    TRUSTED LOGIN
                    <span className="w-1/3 h-[1px] bg-gray-200"></span>
                </div>

                <div className="flex gap-3">
                    <span className=" w-1/3 py-3.5  border border-gray-100 bg-gray-100 flex items-center justify-center rounded-xl hover:bg-gray-200 hover:scale-105"><FontAwesomeIcon icon={faGoogle} /></span>
                    <span className=" w-1/3 py-3.5 bg-gray-100 border border-gray-100 flex items-center justify-center rounded-xl hover:bg-gray-200 hover:scale-105"><FontAwesomeIcon icon={faFacebook} /></span>
                    <span className=" w-1/3 py-3.5 bg-gray-100  border border-gray-100 flex items-center justify-center rounded-xl hover:bg-gray-200 hover:scale-105"><FontAwesomeIcon icon={faApple} /></span>
                </div>
                <span className="text-center text-sm text-gray-400">Already have an account? <Link to='/login' className="text-indigo-600 cursor-pointer hover:underline">Log in now</Link></span>
            </div>
        </div>
    )
}

export default Registration
