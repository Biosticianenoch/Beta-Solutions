import { Layout } from "@/components/layout/Layout";
import { Background } from "@/components/layout/Background";
import { PaymentForm } from "@/components/payment/PaymentForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const PaymentPage = () => {
  return (
    <Background>
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-center mb-8">Complete Your Purchase</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Course Subscription</span>
                      <span>$99.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax</span>
                      <span>$9.90</span>
                    </div>
                    <div className="border-t pt-4">
                      <div className="flex justify-between font-bold">
                        <span>Total</span>
                        <span>$108.90</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <PaymentForm />
            </div>
          </div>
        </div>
      </Layout>
    </Background>
  );
};

export default PaymentPage; 