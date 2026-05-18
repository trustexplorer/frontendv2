// 'use client';
// import useAuthStore from '@/store';
// import { Button } from "@/components/ui/button";
// import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";
// import { Shield, Mail, Lock, Eye, EyeOff, AlertCircle } from "lucide-react";
// import Link from "next/link";
// import React, { useEffect, useState } from 'react'

// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle
// } from "@/components/ui/card";
// import {
//   Alert,
//   AlertDescription,
// } from "@/components/ui/alert";
// import { useRouter, useSearchParams } from 'next/navigation';

// const Resetpassword = () => {
//     const [password, setPassword] = useState("");
//     // const [token, setToken] = useState("");
//     const [isLoading, setIsLoading] = useState(false);
//     const [error, setError] = useState("");
//     // const [searchParams] =useSearchParams();
//     const [confirm_password, setconfirm_password] = useState("");
//     const [showPassword, setShowPassword] = useState(false);
//     const router = useRouter();
//     // const {url} = useAuthStore ((state) => state.url);
//     const searchParams = useSearchParams()
//     const email = searchParams.get('email')
//     const token = searchParams.get('token')

//     const handleSumbit = async (e) => {
//         e.preventDefault();
//         setError("");

//         const myHeaders = new Headers();
//         myHeaders.append('Accept', 'application/json');

//         if (!password) {
//             setError('Please fill in all fields');
//             return;
//         }

//         try {
//             setIsLoading(true);
//             const formData = new FormData();
//             formData.append("password", password);
//             formData.append("confirm_password", confirm_password);
//             formData.append('token', token)
//             formData.append('email', email)

//             // formData.append("token", token);


//             const requestOptions = {
//                 method: 'POST',
//                 headers: myHeaders,
//                 body: formData,
//                 redirect: 'follow'
//             };
//             // console.log(requestOptions.body);

//             const res = await fetch('https://trustexplorer.billspal.com.ng/api/reset-password', requestOptions);
            
//             if (res.ok) {
//                 const data = await res.json();
//                 console.log(data);
//                 setError(data.message)

//                 // localStorage.setItem('userToken', data.data.token)
//                 router.push("/login") 
                
//             } else {
//                 const err = await res.json();
//                 setError(err.message);

//             }
            
//         } catch (err) {
//             setError(err.message)
//         } finally {
//             setIsLoading(false);
//         }

//     };

//   return (
//    <Card className="w-full max-w-md mx-auto">
//       <CardHeader className="space-y-1 text-center">
//         <div className="flex justify-center mb-2">
//           <Shield className="h-10 w-10 text-primary" />
//         </div>
//         <CardTitle className="text-2xl font-bold">Reset your Password</CardTitle>
//         <CardDescription>
//           Enter your password to reset your account 
//         </CardDescription>
//       </CardHeader>
//       <CardContent className="space-y-4">
//         {error && (
//           <Alert variant="destructive">
//             <AlertCircle className="h-4 w-4" />
//             <AlertDescription>{error}</AlertDescription>
//           </Alert>
//         )}
//         <form onSubmit={handleSumbit} className="space-y-4">
//             <div className="flex flex-col md:flex-row gap-4">
//               {/* Password */}
//               <div className="space-y-2 w-full md:w-1/2">
//                 <Label htmlFor="password">Password</Label>
//                 <div className="relative">
//                   <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//                   <Input
//                     id="password"
//                     type={showPassword ? "text" : "password"}
//                     placeholder="••••••••"
//                     className="pl-10 pr-10"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     required
//                   />
//                   <button
//                     type="button"
//                     className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
//                     onClick={() => setShowPassword(!showPassword)}
//                   >
//                     {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
//                   </button>
//                 </div>
//                 <p className="text-sm text-muted-foreground">
//                   Password must be at least 8 characters long
//                 </p>
//               </div>

//               {/* Confirm Password */}
//               <div className="space-y-2 w-full md:w-1/2">
//                 <Label htmlFor="passwordCom">Confirm Password</Label>
//                 <div className="relative">
//                   <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//                   <Input
//                     id="passwordCom"
//                     type="password"
//                     placeholder="••••••••"
//                     className="pl-10"
//                     value={confirm_password}
//                     onChange={(e) => setconfirm_password(e.target.value)}
//                     required
//                   />
//                 </div>
//               </div>
//             </div>


//                     <Button
//                         type="submit"
//                         className="w-full"
//                         disabled={isLoading}
//                     >
//                         {isLoading ? "Reseting..." : "Reset Password"}
//                     </Button>
//                     </form>
//       </CardContent>
//     </Card>
//   )
// }

// export default Resetpassword


