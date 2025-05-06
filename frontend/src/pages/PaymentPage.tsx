import { Layout } from "@/components/layout/Layout";
import { Background } from "@/components/layout/Background";
import { PaymentForm } from "@/components/payment/PaymentForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate, useLocation } from "react-router-dom";

export const PaymentPage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const course = location.state?.course;

  if (!course) {
    navigate('/courses');
    return null;
  }

  const handlePaymentSuccess = (paymentMethod: { id: string; type: string }) => {
    toast({
      title: "Payment Successful",
      description: "Thank you for your purchase! You can now access your course.",
    });
    navigate("/courses");
  };

  const handlePaymentError = (error: Error) => {
    toast({
      title: "Payment Failed",
      description: error.message,
      variant: "destructive",
    });
  };

  const amount = course.price * 100; // Convert to cents for Stripe
  const tax = amount * 0.1; // 10% tax
  const total = amount + tax;

  return (
    <Background>
      <Layout>
        <div className="container py-8">
          <h1 className="text-3xl font-bold mb-8">Complete Your Purchase</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <PaymentForm
              courseId={course.id}
              amount={amount}
              onSuccess={handlePaymentSuccess}
              onError={handlePaymentError}
            />
            
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>{course.title}</span>
                    <span>${(amount / 100).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>${(tax / 100).toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex justify-between font-bold">
                      <span>Total</span>
                      <span>${(total / 100).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </Layout>
    </Background>
  );
}; 