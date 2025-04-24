import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useToast } from "@/components/ui/use-toast";

// Initialize Stripe
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY || "");

interface PaymentFormProps {
  onSuccess?: (paymentMethod: { id: string; type: string }) => void;
  onError?: (error: Error) => void;
}

const PaymentFormContent = ({ onSuccess, onError }: PaymentFormProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const { toast } = useToast();
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setProcessing(true);
    setError(null);

    if (!stripe || !elements) {
      setError("Payment system is not ready. Please try again.");
      return;
    }

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      setError("Card element not found. Please refresh the page.");
      return;
    }

    try {
      const { error: stripeError, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
      });

      if (stripeError) {
        setError(stripeError.message || "An error occurred while processing your payment");
        onError?.(new Error(stripeError.message));
        toast({
          title: "Payment Error",
          description: stripeError.message,
          variant: "destructive",
        });
      } else {
        onSuccess?.(paymentMethod);
        toast({
          title: "Payment Successful",
          description: "Your payment has been processed successfully.",
        });
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An unexpected error occurred";
      setError(errorMessage);
      onError?.(err instanceof Error ? err : new Error(errorMessage));
      toast({
        title: "Payment Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <Label htmlFor="card">Card Details</Label>
        <CardElement
          id="card"
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "hsl(var(--foreground))",
                "::placeholder": {
                  color: "hsl(var(--muted-foreground))",
                },
                backgroundColor: "hsl(var(--background))",
              },
              invalid: {
                color: "hsl(var(--destructive))",
              },
            },
          }}
        />
      </div>

      {error && (
        <div className="text-destructive text-sm">{error}</div>
      )}

      <Button
        type="submit"
        disabled={!stripe || processing}
        className="w-full"
      >
        {processing ? "Processing..." : "Pay Now"}
      </Button>
    </form>
  );
};

const PaymentForm = (props: PaymentFormProps) => {
  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Payment Details</CardTitle>
      </CardHeader>
      <CardContent>
        <Elements stripe={stripePromise}>
          <PaymentFormContent {...props} />
        </Elements>
      </CardContent>
    </Card>
  );
};

export default PaymentForm; 