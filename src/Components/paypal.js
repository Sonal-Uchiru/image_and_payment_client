import React from "react";
import { PayPalButton } from "react-paypal-button-v2";

export default function Paypal(){
return (
<div>
<PayPalButton
        amount="100"
        // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
        onSuccess={(details, data) => {
          alert("Transaction completed by " + details.payer.name.given_name);

          // OPTIONAL: Call your server to save the transaction
          return fetch("/paypal-transaction-complete", {
            method: "post",
            body: JSON.stringify({
              orderId: data.orderID
            })
          });
        }}
        options={{
          clientId: "AdysjOAtp39MYLdaGWB-cGEs4T0QWd_jSF0PO40Of844ElCwGmUWbZ7uXsnA2AtdN__2okZOPRTSjHCh"
        }}
      />
</div>
);
}