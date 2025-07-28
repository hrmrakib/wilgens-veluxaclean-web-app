import Link from "next/link";
import { CheckCircle, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PaymentSuccess() {
  return (
    <div className='min-h-screen bg-[#eeededb7] flex items-center justify-center px-4'>
      <div className='text-center max-w-xl'>
        <div className='flex justify-center mb-6'>
          <CheckCircle className='w-20 h-20 text-green-500' />
        </div>
        <h1 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>
          Payment Successful!
        </h1>
        <p className='text-lg text-gray-600 mb-6'>
          Thank you for upgrading your NexVia plan. Your payment has been
          processed successfully and your account has been upgraded.
        </p>

        <div className='flex justify-center'>
          <Button asChild className='bg-blue-600 hover:bg-blue-700'>
            <Link href='/' className='flex items-center space-x-2'>
              <Home className='w-4 h-4' />
              <span>Go to Home</span>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

// import Link from "next/link";
// import { CheckCircle, Home } from "lucide-react";
// import { Button } from "@/components/ui/button";

// export default function PaymentSuccess() {
//   return (
//     <div className='min-h-screen bg-[#eeededb7]'>
//       {/* Main Content */}
//       <main className='max-w-4xl mx-auto h-full flex items-center justify-center flex-col px-4 sm:px-6 lg:px-8 py-12'>
//         <div className='h-full flex items-center justify-center flex-col px-4 sm:px-6 lg:px-8 py-12'>
//           <div className='text-center mb-8 border-2'>
//             <div className='flex justify-center mb-6'>
//               <CheckCircle className='w-20 h-20 text-green-500' />
//             </div>
//             <h1 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>
//               Payment Successful!
//             </h1>
//             <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
//               Thank you for upgrading your NexVia plan. Your payment has been
//               processed successfully and your account has been upgraded.
//             </p>
//           </div>

//           <div className='flex flex-col sm:flex-row gap-4 justify-center'>
//             <Button asChild className='bg-blue-600 hover:bg-blue-700'>
//               <Link href='/' className='flex items-center space-x-2'>
//                 <Home className='w-4 h-4' />
//                 <span>Go to Home</span>
//               </Link>
//             </Button>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }
