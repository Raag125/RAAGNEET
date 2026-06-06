import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Section,
  Text,
  Hr,
  Link
} from "@react-email/components";
import * as React from "react";

export default function WelcomeEmail({ name = "there", service = "Premium Website" }) {
  return (
    <Html>
      <Head />
      <Preview>Thanks for connecting with RAAGNEET. We received your request regarding a {service}.</Preview>
      <Body style={main}>
        <Container style={container}>
          <Img
            src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3hveGJpdzFteXF5MmIwcHk4NjVjMTFqcGxjYWx2MGN6OW9qMnUyZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/L1R1tvI9svkIWwpVYr/giphy.gif"
            width="100%"
            height="180"
            alt="Welcome to RAAGNEET"
            style={image}
          />
          <Section style={content}>
            <Heading style={heading}>Hello {name},</Heading>
            <Text style={paragraph}>
              Thank you for reaching out to RAAGNEET. We have successfully received your inquiry about a {service}.
            </Text>
            <Text style={paragraph}>
              Our team is already reviewing your details. We will be in touch within the next 24 hours to schedule a quick discovery call and discuss your vision in more depth.
            </Text>
            <Text style={paragraph}>
              In the meantime, if you have any extra details or documents you'd like to share, simply reply directly to this email.
            </Text>
            
            <Text style={paragraph}>
              Talk soon!
            </Text>
            
            <Hr style={hr} />
            
            <Text style={footer}>
              Best regards,<br />
              <strong>The RAAGNEET Team</strong><br />
              <Link href="https://raagneet.com" style={anchor}>raagneet.com</Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
  padding: "20px 0",
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "0 0 20px 0",
  maxWidth: "580px",
  border: "1px solid #eaeaea",
  borderRadius: "8px",
  overflow: "hidden",
};

const image = {
  objectFit: "cover",
  marginBottom: "20px",
};

const content = {
  padding: "0 20px",
};

const heading = {
  color: "#111111",
  fontSize: "20px",
  fontWeight: "600",
  margin: "10px 0 20px",
};

const paragraph = {
  color: "#333333",
  fontSize: "15px",
  lineHeight: "24px",
  marginBottom: "16px",
};

const hr = {
  borderColor: "#eaeaea",
  margin: "30px 0 20px",
};

const footer = {
  color: "#666666",
  fontSize: "14px",
  lineHeight: "22px",
};

const anchor = {
  color: "#000000",
  textDecoration: "underline",
};
