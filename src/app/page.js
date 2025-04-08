'use client'
import Link from 'next/link'
import { Lock, Heart, Shield, Sparkles,ArrowRight } from 'lucide-react'
import Footer from './components/Footer'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-white p-3 rounded-full shadow-lg">
              <Lock className="h-8 w-8 text-indigo-600" />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
            Share Your <span className="text-indigo-600">Secrets</span> Safely
          </h1>
          
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            A completely anonymous space to confess your thoughts without judgment. 
            Your identity stays hidden, always.
          </p>
          
          {/* Auth Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
            <Link 
              href="/register" 
              className="px-8 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors shadow-md hover:shadow-lg"
            >
              Create Free Account
            </Link>
            <Link 
              href="/login" 
              className="px-8 py-3 bg-white text-indigo-600 rounded-lg font-medium hover:bg-gray-50 transition-colors shadow-md hover:shadow-lg border border-indigo-100"
            >
              Already Registered? Login
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Why Choose <span className="text-indigo-600">ConfessHub</span>?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Feature 1 */}
            <div className="bg-gray-50 p-6 rounded-xl hover:shadow-md transition-shadow">
              <div className="bg-indigo-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Complete Anonymity</h3>
              <p className="text-gray-600">
                Your identity is protected with military-grade encryption. No tracking, no logs.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-gray-50 p-6 rounded-xl hover:shadow-md transition-shadow">
              <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Heart className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Supportive Community</h3>
              <p className="text-gray-600">
                Connect with others who understand. You're not alone in your thoughts.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-gray-50 p-6 rounded-xl hover:shadow-md transition-shadow">
              <div className="bg-pink-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Sparkles className="h-6 w-6 text-pink-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Therapeutic Release</h3>
              <p className="text-gray-600">
                Experience the freedom of sharing what you can't say anywhere else.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-indigo-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Lighten Your Heart?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands who've found peace through anonymous sharing.
          </p>
          <Link 
            href="/home" 
            className="inline-block px-8 py-3 bg-white text-indigo-600 rounded-lg font-medium hover:bg-gray-100 transition-colors shadow-md hover:shadow-lg"
          >
            Start Confessing Now <ArrowRight className="inline ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Footer */}
    <Footer></Footer>
    </div>
  )
}