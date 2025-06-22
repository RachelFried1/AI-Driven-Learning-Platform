import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Bot, Sparkles, ArrowRight, Brain, Target, Zap } from 'lucide-react';
import { useAppSelector } from '@/app/hooks';

const Home: React.FC = () => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="p-3 bg-blue-600 rounded-full">
                <Brain className="h-12 w-12 text-white" />
              </div>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Learn Anything with
              <span className="text-blue-600 block">AI-Powered Lessons</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Get personalized, interactive lessons on any topic. Our AI adapts to your learning style, 
              pace, and goals to create the perfect educational experience just for you.
            </p>
            
            {!isAuthenticated && (
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/lessons">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-3">
                    <Sparkles className="h-5 w-5 mr-2" />
                    Start Learning
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Button>
                </Link>
                
                <Link to="/register">
                  <Button variant="outline" size="lg" className="text-lg px-8 py-3">
                    Create Free Account
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose AI Learn?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience the future of education with our intelligent learning platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <Bot className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle>AI-Powered Personalization</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Our intelligent assistant analyzes your learning preferences and creates 
                  lessons tailored specifically to your needs and skill level.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <Target className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle>Guided Learning Path</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Get step-by-step guidance with our smart chatbot that helps you formulate 
                  the perfect learning request for maximum effectiveness.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle>Instant Learning</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Get comprehensive lessons in seconds. No waiting, no scheduling - 
                  learn what you want, when you want, at your own pace.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Simple steps to unlock your learning potential
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: "1",
                title: "Choose Your Topic",
                description: "Select from our comprehensive categories covering Mathematics, Science, Programming, and more."
              },
              {
                step: "2", 
                title: "Get AI Guidance",
                description: "Our smart assistant helps you craft the perfect learning request with targeted questions."
              },
              {
                step: "3",
                title: "Receive Your Lesson",
                description: "Get a personalized, comprehensive lesson generated instantly by our AI."
              },
              {
                step: "4",
                title: "Track Progress",
                description: "Review your learning history and continue building on your knowledge."
              }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Transform Your Learning?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of learners who are already experiencing the power of AI-driven education
          </p>
          
          {!isAuthenticated && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/lessons">
                <Button size="lg" variant="secondary" className="text-lg px-8 py-3">
                  <BookOpen className="h-5 w-5 mr-2" />
                  Explore Lessons
                </Button>
              </Link>
              
              <Link to="/register">
                <Button size="lg" variant="outline" className="text-lg px-8 py-3 border-white text-white hover:bg-white hover:text-blue-600">
                  Get Started Free
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;