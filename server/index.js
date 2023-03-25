const express = require("express")
const Stripe = require("stripe")
const cors = require("cors")

const app = express()


const stripe = new Stripe()

app.use(cors({origin: "http://localhost:3000"}))
app.use(express.json())

app.post("/api/checkout", async (req, res) => {
    try {const{id, amount} = req.body
    const payment = await stripe.paymentIntents.create({
        amount,
        currency: "USD",
        description: "gaming keyboard",
        payment_method: id,
        confirm: true
        
    })
    console.log(payment);
    res.send("Payment was successfull")
} catch(error) {
    console.log(error);
    res.json({message: error.raw.message})
}
})

app.listen(8000, () => {
    console.log("Server running on port", 8000)
})