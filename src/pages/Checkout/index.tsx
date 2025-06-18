import { useCart } from "@/features/Cart/hooks/useCart";

import CheckoutItem from "./CheckoutItem";
import { Button } from "@/shared/components/ui/button";
import { removeFromCart } from "@/features/Cart/cartSlice";
import { useAppDispatch } from "@/app/hook";
import { useAuth } from "@/features/Auth/hooks/useAuth";
import { useNavigate } from "react-router";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/shared/components/ui/dialog";
import { LoginForm } from "@/shared/components/LoginForm";

export default function Checkout() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { items, total } = useCart();
  const { user } = useAuth();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleCheckout = () => {
    setIsDialogOpen(true);
    if (user) {
      setShowSuccess(true);
    } else {
      setShowSuccess(false);
    }
  };

  const handleLoginSuccess = (email: string, password: string) => {
    console.log("Login successful:", email);
    setShowSuccess(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setShowSuccess(false);
  };

  const handleSuccessClose = () => {
    setIsDialogOpen(false);
    setShowSuccess(false);
    navigate("/");
  };

  return (
    <div className="flex flex-col gap-4 mx-4">
      <div className="mx-auto flex flex-col gap-4">
        <h1 className="text-2xl font-bold text-center mt-4">Checkout</h1>
        <div className="flex flex-col gap-4 items-center mt-4">
          <div className="flex flex-col gap-4 items-center">
            {items.map((item) => (
              <CheckoutItem
                key={item.id}
                item={item}
                removeFromCart={() => dispatch(removeFromCart(item.id))}
              />
            ))}
          </div>
        </div>
        {items.length === 0 && (
          <p className="text-center text-lg font-bold">No items in the cart</p>
        )}

        {items.length > 0 && (
          <div className="flex items-center justify-between gap-2 mt-4">
            <div className="flex gap-2">
              <h2 className="text-3xl font-bold">Total:</h2>
              <p className="text-3xl font-bold">S/. {total}</p>
            </div>
            <Button
              className="cursor-pointer"
              onClick={handleCheckout}
            >
              Checkout
            </Button>
          </div>
        )}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          {showSuccess ? (
            <>
              <DialogHeader>
                <DialogTitle>Checkout Successful!</DialogTitle>
                <DialogDescription>
                  Your order has been placed successfully. Thank you for your purchase!
                </DialogDescription>
              </DialogHeader>
              <div className="flex justify-end gap-2 mt-4">
                <Button onClick={handleSuccessClose}>
                  Continue Shopping
                </Button>
              </div>
            </>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle>Login Required</DialogTitle>
                <DialogDescription>
                  Please log in to complete your checkout.
                </DialogDescription>
              </DialogHeader>
              <LoginForm onSuccessLogin={handleLoginSuccess} />
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}