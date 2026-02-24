import * as brevo from "@getbrevo/brevo";
console.log("Brevo keys:", Object.keys(brevo.Brevo || {}));
console.log("BrevoClient keys:", Object.keys(brevo.BrevoClient || {}));
