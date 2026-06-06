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
      <Preview>Thanks for connecting with RAAGNEET! We're excited to build {service} for you.</Preview>
      <Body style={main}>
        <Container style={container}>
          <Img
            src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3hveGJpdzFteXF5MmIwcHk4NjVjMTFqcGxjYWx2MGN6OW9qMnUyZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/L1R1tvI9svkIWwpVYr/giphy.gif"
            width="100%"
            height="250"
            alt="Futuristic Tech Animation"
            style={image}
          />
          <Section style={content}>
            <Heading style={heading}>Hello {name},</Heading>
            <Text style={paragraph}>
              Thank you for reaching out to <strong>RAAGNEET</strong>. We have received your request regarding your interest in a <strong>{service}</strong>.
            </Text>
            <Text style={paragraph}>
              Our team of expert developers and designers is already reviewing your requirements. We bridge the gap between imagination and execution, and we can't wait to build a high-performance digital asset that defines the new standard for you.
            </Text>
            
            <Section style={box}>
              <Text style={boxText}>
                <strong>Next Steps:</strong> We will contact you within the next 24 hours to schedule a quick discovery call and discuss your vision in detail.
              </Text>
            </Section>

            <Text style={paragraph}>
              In the meantime, feel free to reply directly to this email if you have any additional details or files to share.
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
  backgroundColor: "#030305",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
  padding: "40px 0",
};

const container = {
  backgroundColor: "#0a0a0c",
  margin: "0 auto",
  padding: "0 0 20px 0",
  borderRadius: "12px",
  overflow: "hidden",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  boxShadow: "0 10px 40px rgba(0, 255, 224, 0.1)",
  maxWidth: "600px",
};

const image = {
  objectFit: "cover",
};

const content = {
  padding: "0 40px",
};

const heading = {
  color: "#ffffff",
  fontSize: "24px",
  fontWeight: "bold",
  margin: "30px 0 15px",
};

const paragraph = {
  color: "#a1a1aa",
  fontSize: "16px",
  lineHeight: "24px",
  marginBottom: "20px",
};

const box = {
  background: "rgba(0, 255, 224, 0.05)",
  borderLeft: "4px solid #00FFE0",
  padding: "16px 20px",
  borderRadius: "0 8px 8px 0",
  marginBottom: "20px",
};

const boxText = {
  color: "#e4e4e7",
  fontSize: "15px",
  lineHeight: "22px",
  margin: 0,
};

const hr = {
  borderColor: "rgba(255, 255, 255, 0.1)",
  margin: "30px 0",
};

const footer = {
  color: "#71717a",
  fontSize: "14px",
  lineHeight: "22px",
};

const anchor = {
  color: "#00FFE0",
  textDecoration: "none",
};
