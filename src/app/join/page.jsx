// File: src/app/join/page.jsx
"use client";

import React, { useState, useEffect } from "react";
import "antd/dist/reset.css";
import {
  Layout,
  Button,
  Input,
  Card,
  Avatar,
  message,
  Modal,
  Form,
  Select,
} from "antd";
import { useRouter } from "next/navigation";
import HeaderPage from "@/components/Header";
import FooterPage from "@/components/Footer";
import { authApi } from "@/utils/api";

const { Content } = Layout;
const { Option } = Select;

export default function JoinPage() {
  const router = useRouter();

  // flow state
  const [step, setStep] = useState(1); // 1 phone, 2 otp, 3 extra-info
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  // extra info
  const [userId, setUserId] = useState(null);
  const [referralCode, setReferralCode] = useState("");
  const [missingFields, setMissingFields] = useState(null);

  // modal visibility for additional info form
  const [modalVisible, setModalVisible] = useState(false);

  // keep form instance for modal
  const [form] = Form.useForm();

  // When API asks for extra info, open modal (don't prefill referredBy)
  useEffect(() => {
    if (step === 3) {
      form.resetFields();
      // explicitly do not set referredBy (keep blank)
      setModalVisible(true);
    }
  }, [step, form]);

  // ---------------- sendOtp ----------------
  const sendOtp = async () => {
    if (!/^\d{10}$/.test(phone)) {
      return message.error("Please enter a valid 10-digit phone number");
    }

    setLoading(true);
    try {
      const res = await authApi.post("/auth/login", { phone: phone });

      if (res?.data?.success) {
        message.success(res.data.message || "OTP sent!");
        if (res.data.otp) console.debug("dev OTP:", res.data.otp);
        setStep(2);
        setOtp(res.data.otp || "")
      } else {
        message.error(res?.data?.message || "Error sending OTP");
      }
    } catch (err) {
      const errMsg = err?.response?.data?.message || err.message || "Auth service error";
      message.error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  // ---------------- verifyOtp ----------------
  const verifyOtp = async () => {
    if (!/^\d{4,6}$/.test(otp)) return message.error("Enter a valid OTP");

    setLoading(true);
    try {
      const res = await authApi.post("/auth/verify", { phone: phone, otp: otp });

      // success with token => finished login
      if (res?.data?.success && res?.data?.token) {
        const token = res.data.token;
        const user = res.data.user || null;
        if (typeof window !== "undefined") {
          localStorage.setItem("access_token", token);
          if (user) localStorage.setItem("user", JSON.stringify(user));
        }
        message.success("Logged in successfully");
        router.push("/");
        return;
      }

      // additional info required (created or existing)
      if (res?.data?.code === "additional_info_required") {
        setUserId(res.data.userId || null);
        setReferralCode(res.data.referralCode || "");
        setMissingFields(res.data.missing || null);
        // open modal via step change
        setStep(3);
        message.info("Please complete your profile to continue");
        return;
      }

      const errMsg = res?.data?.message || res?.data?.error || "OTP verification failed";
      message.error(errMsg);
    } catch (err) {
      const errMsg = err?.response?.data?.message || err.message || "Network error while verifying OTP";
      message.error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  // ---------------- submit additional info (from modal) ----------------
  const submitAdditionalInfo = async (values) => {
    // values contains fields from form
    if (!userId) return message.error("Missing userId. Please restart the flow.");

    setLoading(true);
    try {
      const payload = {
        userId,
        name: values.name || "",
        city: values.city || "",
        dob: values.dob || "",
        maritalStatus: values.maritalStatus || "",
        occupation: values.occupation || "",
        email: values.email || "",
        referredBy: values.referredBy || "", // blank by default per your request
      };

      const res = await authApi.post("/auth/complete", payload);

      if (res?.data?.success && res?.data?.token) {
        const token = res.data.token;
        const user = res.data.user || null;
        const details = res.data.details || null;
        if (typeof window !== "undefined") {
          localStorage.setItem("access_token", token);
          if (user) localStorage.setItem("user", JSON.stringify(user));
          if (details) localStorage.setItem("userDetails", JSON.stringify(details));
        }
        message.success("Profile completed and logged in");
        setModalVisible(false);
        router.push("/");
        return;
      }

      const errMsg = res?.data?.message || res?.data?.error || "Failed to complete profile";
      message.error(errMsg);
    } catch (err) {
      const errMsg = err?.response?.data?.message || err.message || "Network error while completing profile";
      message.error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  // ---------------- helpers ----------------
  const isFieldRequired = (field) => {
    if (!missingFields) return false;
    return missingFields.includes(field);
  };

  // Render
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white dark:from-zinc-900 dark:to-zinc-900">
      <Layout className="min-h-screen bg-transparent">
        <HeaderPage />

        <Content className="mx-auto max-w-7xl px-6 py-20">
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left hero */}
            <div className="space-y-6">
              <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">
                Join SainVandeBharat — community, marketplace & trusted matches.
              </h1>
              <p className="text-zinc-600 dark:text-zinc-300 max-w-xl">
                Create your account using phone — connect with your community, sell handcrafted goods, invite friends and discover meaningful matches tailored to your values.
              </p>

              <div className="mt-6 grid grid-cols-3 gap-3 max-w-sm">
                <div className="p-3 bg-white rounded-lg shadow-sm">
                  <div className="text-xs text-zinc-500">Communities</div>
                  <div className="text-lg font-semibold">+1,200</div>
                </div>
                <div className="p-3 bg-white rounded-lg shadow-sm">
                  <div className="text-xs text-zinc-500">Products</div>
                  <div className="text-lg font-semibold">4,500</div>
                </div>
                <div className="p-3 bg-white rounded-lg shadow-sm">
                  <div className="text-xs text-zinc-500">Matches</div>
                  <div className="text-lg font-semibold">8,700</div>
                </div>
              </div>
            </div>

            {/* Right card (keeps a consistent size so layout doesn't shift) */}
            <div id="join-form" className="flex items-start justify-center">
              <Card className="w-full max-w-md rounded-2xl p-6 shadow-md">
                <div className="flex items-center gap-3 mb-4">
                  <Avatar size={48} style={{ backgroundColor: "#10B981", color: "#fff" }}>SV</Avatar>
                  <div>
                    <div className="font-semibold text-lg">Join SainVandeBharat</div>
                    <div className="text-sm text-zinc-500">Quick secure login with phone</div>
                  </div>
                </div>

                {/* Step 1: phone */}
                {step === 1 && (
                  <div className="space-y-4">
                    <label className="text-sm text-zinc-600">Mobile number</label>
                    <div className="flex gap-2">
                      <select className="rounded-lg border border-zinc-300 px-3 py-2 bg-zinc-50 text-sm">
                        <option value="+91">+91</option>
                      </select>
                      <Input
                        placeholder="Enter 10-digit mobile number"
                        value={phone}
                        maxLength={10}
                        onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, ""))}
                      />
                    </div>

                    <div className="flex gap-3">
                      <Button type="primary" size="large" loading={loading} onClick={sendOtp} className="rounded-lg flex-1">
                        Send OTP
                      </Button>
                      <Button onClick={() => setPhone("")} className="flex-1">Cancel</Button>
                    </div>

                    <p className="text-xs text-zinc-400 mt-2">
                      We will send a 4-6 digit OTP to verify your number. For testing use <strong>123456</strong>.
                    </p>
                  </div>
                )}

                {/* Step 2: OTP - tidy layout so verify is large and edit/resend are stacked */}
                {step === 2 && (
                  <div className="space-y-4">
                    <label className="text-sm text-zinc-600">Enter OTP</label>
                    <Input
                      placeholder="Enter OTP"
                      value={otp}
                      maxLength={6}
                      onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ""))}
                    />

                    <div className="flex items-start gap-3 pt-2">
                      <div className="flex-1">
                        <Button type="primary" size="large" loading={loading} onClick={verifyOtp} className="rounded-lg w-full">
                          Verify & Continue
                        </Button>
                      </div>

                      <div className="flex flex-col gap-2 w-36">
                        <Button onClick={() => setStep(1)} className="rounded-md">Edit</Button>
                        <Button onClick={sendOtp} className="rounded-md">Resend</Button>
                      </div>
                    </div>

                    <p className="text-xs text-zinc-400 mt-2">Didn't receive OTP? Try resending or check number.</p>
                  </div>
                )}

                {/* Step 3: show a compact notice and open modal for details (modal prevents layout shift) */}
                {step === 3 && (
                  <div className="space-y-4">
                    <div className="text-sm text-zinc-700">
                      Additional details are required to complete your account.
                    </div>
                    <div className="flex gap-3">
                      <Button type="primary" onClick={() => setModalVisible(true)} className="flex-1">
                        Complete Profile
                      </Button>
                      <Button onClick={() => { setStep(1); setUserId(null); setMissingFields(null); }}>Cancel</Button>
                    </div>
                    <p className="text-xs text-zinc-400 mt-2">
                      You can fill the required fields in the form. Referral field is left blank for you to enter if you were referred.
                    </p>
                  </div>
                )}
              </Card>
            </div>
          </section>

          {/* Small features */}
          <section className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="text-sm text-zinc-500">Trusted Sellers</div>
              <div className="font-semibold mt-2">Local creators</div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="text-sm text-zinc-500">Verified Profiles</div>
              <div className="font-semibold mt-2">Safe matches</div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="text-sm text-zinc-500">Referral Rewards</div>
              <div className="font-semibold mt-2">Earn credits</div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="text-sm text-zinc-500">Community Events</div>
              <div className="font-semibold mt-2">Join meetups</div>
            </div>
          </section>
        </Content>

        <FooterPage />
      </Layout>

      {/* Modal for additional info (prevents layout shift) */}
      <Modal
        title="Complete your profile"
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
        centered
      >
        <Form
          layout="vertical"
          form={form}
          onFinish={(values) => submitAdditionalInfo(values)}
          initialValues={{
            name: "",
            city: "",
            dob: "",
            maritalStatus: "",
            occupation: "",
            email: "",
            referredBy: "", // intentionally blank per your request
          }}
        >
          {/* Show only fields that are missing (if server provided missing list) otherwise show all */}
          {(!missingFields || missingFields.includes("name")) && (
            <Form.Item
              label="Full name"
              name="name"
              rules={[{ required: !!(missingFields && missingFields.includes("name")), message: "Please enter name" }]}
            >
              <Input />
            </Form.Item>
          )}

          {(!missingFields || missingFields.includes("city")) && (
            <Form.Item
              label="City"
              name="city"
              rules={[{ required: !!(missingFields && missingFields.includes("city")), message: "Please enter city" }]}
            >
              <Input />
            </Form.Item>
          )}

          {(!missingFields || missingFields.includes("dob")) && (
            <Form.Item
              label="Date of Birth"
              name="dob"
              rules={[{ required: !!(missingFields && missingFields.includes("dob")), message: "Please enter date of birth" }]}
            >
              <Input type="date" />
            </Form.Item>
          )}

          {(!missingFields || missingFields.includes("maritalStatus")) && (
            <Form.Item
              label="Marital status"
              name="maritalStatus"
              rules={[{ required: !!(missingFields && missingFields.includes("maritalStatus")), message: "Please select marital status" }]}
            >
              <Select placeholder="Select">
                <Option value="single">Single</Option>
                <Option value="married">Married</Option>
                <Option value="divorced">Divorced</Option>
                <Option value="widowed">Widowed</Option>
              </Select>
            </Form.Item>
          )}

          {(!missingFields || missingFields.includes("occupation")) && (
            <Form.Item
              label="Occupation"
              name="occupation"
              rules={[{ required: !!(missingFields && missingFields.includes("occupation")), message: "Please enter occupation" }]}
            >
              <Input />
            </Form.Item>
          )}

          {/* optional fields */}
          <Form.Item label="Email (optional)" name="email">
            <Input />
          </Form.Item>

          <Form.Item label="Referral code (optional)" name="referredBy">
            <Input placeholder="Enter referral code (leave blank if none)" />
          </Form.Item>

          <div className="flex gap-3">
            <Button type="primary" htmlType="submit" loading={loading} className="flex-1">
              Submit & Continue
            </Button>
            <Button onClick={() => setModalVisible(false)} className="flex-1">
              Cancel
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
}
