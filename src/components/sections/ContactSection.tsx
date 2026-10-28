"use client";

import { useState } from "react";
import { useSite } from "@/components/interactions/SiteContext";
import { contact, methods } from "@/data/onos-content";

export function ContactSection() {
  const { language, t } = useSite();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    method: "DTG printing",
    quantity: "",
    destination: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const isEn = language === "en";
    const subject = isEn
      ? `Project Enquiry | ${formData.method} | Onos Global`
      : `Yêu cầu dự án | ${formData.method} | Onos Global`;
    const body = isEn
      ? `Hello Onos team,\n\nName: ${formData.name}\nEmail: ${formData.email}\nProduction method: ${formData.method}\nExpected quantity: ${formData.quantity}\nDestination: ${formData.destination}\n\nProject details:\n${formData.message}\n\nPlease advise on sampling, pricing and production lead time.`
      : `Chào đội ngũ Onos,\n\nHọ và tên: ${formData.name}\nEmail: ${formData.email}\nCông nghệ: ${formData.method}\nSố lượng dự kiến: ${formData.quantity}\nĐiểm đến: ${formData.destination}\n\nChi tiết dự án:\n${formData.message}\n\nNhờ Onos tư vấn mẫu, báo giá và tiến độ sản xuất.`;

    window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    setSubmitted(true);
  };

  return (
    <section id="contact" className="contact-section">
      <div className="contact-main section-spacing">
        <div className="container-full">
          <div className="w-layout-grid grid-contact">
            {/* Left Info Column */}
            <div className="contact-main-info">
              <div
                data-w-id="de00b61c-1ece-35fa-f76b-0f658df5c5c0"
                className="contact-left-wrap"
              >
                <div className="contact-title-wrap">
                  <h2 className="contact-title">
                    {language === "vi" ? (
                      <>
                        Cùng bắt đầu <span className="text-linear-gradient">dự án</span> của bạn
                      </>
                    ) : (
                      <>
                        Let’s make <span className="text-linear-gradient">something</span> happen
                      </>
                    )}
                  </h2>
                </div>
                <p className="contact-description">
                  {t(
                    "Send your product idea, artwork, expected volume and destination. Our team will help you shape the next step."
                  )}
                </p>
              </div>

              <div
                data-w-id="51462de8-daa5-0e47-b122-e655531d26e6"
                className="contact-list-item"
              >
                <div className="contact-item">
                  <div className="item-title-wrap">
                    <div className="contact-item-title">{t("// Contact us on //")}</div>
                  </div>
                  <div className="contact-item-list">
                    <a href={`tel:${contact.telephone}`} className="contact-link">
                      {contact.phone}
                    </a>
                    <a href={`mailto:${contact.email}`} className="contact-link">
                      {contact.email}
                    </a>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="item-title-wrap">
                    <div className="contact-item-title">{t("// Find us //")}</div>
                  </div>
                  <div className="contact-item-list _02">
                    <div className="contact-item-text">{contact.address}</div>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="item-title-wrap">
                    <div className="contact-item-title">{t("// Working hours //")}</div>
                  </div>
                  <div className="contact-item-list _02">
                    <div className="contact-item-text">{contact.hours}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Project Brief Form */}
            <div className="contact-form-wrap">
              <div className="form-main w-form">
                <form
                  onSubmit={handleSubmit}
                  id="email-form"
                  name="email-form"
                  data-name="Email Form"
                  className="form"
                >
                  <div className="form-inner">
                    <div className="form-input-wrap">
                      <label htmlFor="Name" className="form-label">
                        {t("Your Name")} *
                      </label>
                      <input
                        className="form-input w-input"
                        maxLength={256}
                        name="Name"
                        data-name="Name"
                        placeholder="e.g. John Doe"
                        type="text"
                        id="Name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>

                    <div className="form-input-wrap">
                      <label htmlFor="Contact-Email" className="form-label">
                        {t("Email Address")} *
                      </label>
                      <input
                        className="form-input w-input"
                        maxLength={256}
                        name="Email"
                        data-name="Email"
                        placeholder="e.g. john@brand.com"
                        type="email"
                        id="Contact-Email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>

                    <div className="form-input-wrap">
                      <label htmlFor="Method" className="form-label">
                        {t("Production Method")}
                      </label>
                      <select
                        id="Method"
                        name="Method"
                        className="form-input w-input"
                        style={{ height: "48px" }}
                        value={formData.method}
                        onChange={(e) => setFormData({ ...formData, method: e.target.value })}
                      >
                        {methods.map((m) => (
                          <option key={m.id} value={m.title}>
                            {t(m.title)} ({t(m.applications)})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="form-input-wrap">
                      <label htmlFor="Quantity" className="form-label">
                        {t("Expected Quantity")}
                      </label>
                      <input
                        className="form-input w-input"
                        maxLength={256}
                        name="Quantity"
                        data-name="Quantity"
                        placeholder="e.g. 100 pcs or 1 sample"
                        type="text"
                        id="Quantity"
                        value={formData.quantity}
                        onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                      />
                    </div>

                    <div className="form-input-wrap full-width">
                      <label htmlFor="Destination" className="form-label">
                        {t("Destination (Country / Zip)")}
                      </label>
                      <input
                        className="form-input w-input"
                        maxLength={256}
                        name="Destination"
                        data-name="Destination"
                        placeholder="e.g. Los Angeles, USA or Hanoi, Vietnam"
                        type="text"
                        id="Destination"
                        value={formData.destination}
                        onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                      />
                    </div>

                    <div className="form-input-wrap full-width">
                      <label htmlFor="Message" className="form-label">
                        {t("Message / Project details")}
                      </label>
                      <textarea
                        id="Message"
                        name="Message"
                        maxLength={5000}
                        data-name="Message"
                        placeholder="Describe your design, garments, timeline or special instructions..."
                        className="form-textarea w-input"
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      ></textarea>
                    </div>
                  </div>

                  <div className="form-btn-wrap" style={{ marginTop: "24px" }}>
                    <button
                      type="submit"
                      data-wf--button-arrow--variant="base"
                      className="primary-button w-inline-block"
                      style={{ border: "none", cursor: "pointer" }}
                    >
                      <div className="button-primary-inner">
                        <div className="button-text-wrap">
                          <div className="button-text-inner">
                            <div className="button-text">{t("Email your project brief")}</div>
                            <div className="button-hover-text">{t("Email your project brief")}</div>
                          </div>
                        </div>
                        <div className="button-icon-bg">
                          <img
                            src="/assets/75e8f722a505-68d527b447e1a5cc60cc1c27_button-icon.svg"
                            loading="eager"
                            alt="Arrow"
                            className="button-icon"
                          />
                          <img
                            src="/assets/75e8f722a505-68d527b447e1a5cc60cc1c27_button-icon.svg"
                            loading="lazy"
                            alt="Arrow"
                            className="button-icon-hover"
                          />
                        </div>
                      </div>
                    </button>
                    <p style={{ marginTop: "12px", fontSize: "0.85rem", color: "#888" }}>
                      {t("Opens your email app with a project outline ready to fill in.")}
                    </p>
                    {submitted && (
                      <div
                        style={{
                          marginTop: "16px",
                          padding: "12px 16px",
                          borderRadius: "8px",
                          backgroundColor: "rgba(255, 107, 0, 0.08)",
                          border: "1px solid rgba(255, 107, 0, 0.3)",
                          color: "var(--color--white)",
                          fontSize: "0.88rem",
                          lineHeight: 1.4,
                        }}
                      >
                        <div style={{ fontWeight: 600 }}>
                          {language === "vi"
                            ? "Ứng dụng email đã được mở cùng bản phác thảo dự án. Vui lòng gửi email đã soạn để hoàn tất."
                            : "Your email app has been opened with your project outline. Please send the prepared email to reach our team."}
                        </div>
                        <div style={{ marginTop: "6px", fontSize: "0.82rem", opacity: 0.85 }}>
                          {language === "vi" ? (
                            <>
                              Nếu ứng dụng không tự mở, vui lòng gửi thông tin trực tiếp tới{" "}
                              <a
                                href={`mailto:${contact.email}`}
                                style={{ color: "var(--color--primary)", textDecoration: "underline" }}
                              >
                                {contact.email}
                              </a>
                              .
                            </>
                          ) : (
                            <>
                              If your email app did not open, please email your brief directly to{" "}
                              <a
                                href={`mailto:${contact.email}`}
                                style={{ color: "var(--color--primary)", textDecoration: "underline" }}
                              >
                                {contact.email}
                              </a>
                              .
                            </>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="line-wrapper">
        <div className="section-line border-grey-1"></div>
        <div className="section-line border-grey-1"></div>
        <div className="section-line border-grey-1"></div>
        <div className="section-line border-grey-1"></div>
        <div className="section-line border-grey-1"></div>
      </div>
    </section>
  );
}
