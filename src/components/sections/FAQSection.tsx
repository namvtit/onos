"use client";

import { useState } from "react";
import { useSite } from "@/components/interactions/SiteContext";
import { faqs } from "@/data/onos-content";

export function FAQSection() {
  const { language, t } = useSite();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex((curr) => (curr === idx ? null : idx));
  };

  return (
    <section id="faq" className="faqs-section section-spacing">
      <div className="container">
        <div
          data-w-id="cd4d3bf3-e255-714a-a12d-0490dd2d2cf9"
          className="section-title-center"
          style={{ marginBottom: "50px" }}
        >
          <div data-wf--pre-section-title--variant="base" className="pre-section-title-wrap">
            <div className="pre-section-title-inner">
              <div className="pre-section-title-square"></div>
              <div className="pre-section-title">{t("Before We Get Started")}</div>
            </div>
          </div>
          <h2 className="section-title title-center">
            {language === "vi" ? (
              <>
                Câu hỏi <span className="text-linear-gradient">thường gặp</span>
              </>
            ) : (
              <>
                Frequently asked <span className="text-linear-gradient">questions</span>
              </>
            )}
          </h2>
        </div>

        <div className="w-layout-blockcontainer container-small w-container">
          <div data-w-id="43adcf99-8015-5017-f8d1-4ee7dba56ec8" className="faqs-wrap">
            {faqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div key={idx} className="accordion-item">
                  <div
                    role="button"
                    tabIndex={0}
                    aria-expanded={isOpen}
                    onClick={() => toggle(idx)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        toggle(idx);
                      }
                    }}
                    className="accordion-heading"
                    style={{ cursor: "pointer" }}
                  >
                    <h3 className="accordion-title">{t(faq.question)}</h3>
                    <div className="accordion-icon-bg">
                      <img
                        src="/assets/536a795c5a7c-68dcc369de4ced980408d673_-.svg"
                        loading="lazy"
                        alt="Toggle Icon"
                        className="plus-icon"
                        style={{
                          transform: isOpen ? "rotate(0deg)" : "rotate(45deg)",
                          transition: "transform 0.3s ease",
                        }}
                      />
                    </div>
                  </div>
                  <div
                    className="accordion-content"
                    style={{
                      display: isOpen ? "block" : "none",
                      paddingTop: isOpen ? "16px" : "0px",
                    }}
                  >
                    <p className="accordion-description">{t(faq.answer)}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
