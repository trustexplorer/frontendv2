'use client';
import { useEffect, useState, Suspense } from 'react';
import useAuthStore from '@/store';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function VerifyPageContent() {
  const searchParams = useSearchParams();
  const url = useAuthStore(state => state.url);
  const router = useRouter();

  const email = searchParams.get('email');
  const token = searchParams.get('token');

  useEffect(() => {
    const fetchVerify = async () => {
      try {
        const response = await fetch(`${url}/user/verify-email?email=${email}&token=${token}`);
        if (response.ok) {
          const data = await response.json();
          toast.success(data.message);
          setTimeout(() => {
            router.push('/login');
          }, 5000);
        } else {
          const err = await response.json();
          toast.error(err.error || 'Verification failed.');
        }
      } catch (error) {
        console.error(error);
        toast.error('An error occurred.');
      }
    };

    if (email && token) {
      setTimeout(() => {
        fetchVerify();
      }, 1000);
    }
  }, [email, token, url, router]);

  return (
    <>
      <ToastContainer />
      <div className="text-center py-10">
        Verifying your email. Please wait...
      </div>
    </>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center py-10">Loading...</div>}>
      <VerifyPageContent />
    </Suspense>
  );
}
