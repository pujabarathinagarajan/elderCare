import React from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { useTranslation } from "react-i18next";

function Icon({ id, open }: { id: number; open: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={`${
        id === open ? "rotate-180" : ""
      } h-5 w-5 transition-transform`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
      />
    </svg>
  );
}

function Faq() {
  const { t } = useTranslation("landingPage");

  const [open, setOpen] = React.useState(0);

  const handleOpen = (value: number) => setOpen(open === value ? 0 : value);

  return (
    <>
      <div className="flex my-36">
        <div className="w-1/3">
          <img src="/landing-page/footer.png" alt="" />
        </div>
        <div className="w-2/3 ml-10 text-left">
          <span className="text-4xl font-bold ">{t("landing.faq.title")}</span>
          <Accordion open={open === 1} icon={<Icon id={1} open={open} />}>
            <AccordionHeader onClick={() => handleOpen(1)}>
              {t("landing.faq.1.title")}
            </AccordionHeader>
            <AccordionBody>
              {t("landing.faq.1.content")}
            </AccordionBody>
          </Accordion>
          <Accordion open={open === 2} icon={<Icon id={2} open={open} />}>
            <AccordionHeader onClick={() => handleOpen(2)}>
              {t("landing.faq.2.title")}
            </AccordionHeader>
            <AccordionBody>
            {t("landing.faq.2.content")}
            </AccordionBody>
          </Accordion>
          <Accordion open={open === 3} icon={<Icon id={3} open={open} />}>
            <AccordionHeader onClick={() => handleOpen(3)}>
              {t("landing.faq.3.title")}
            </AccordionHeader>
            <AccordionBody>
            {t("landing.faq.3.content")}
            </AccordionBody>
          </Accordion>
          <Accordion open={open === 4} icon={<Icon id={4} open={open} />}>
            <AccordionHeader onClick={() => handleOpen(4)}>
            {t("landing.faq.4.title")}
            </AccordionHeader>
            <AccordionBody>
            {t("landing.faq.4.content")}
            </AccordionBody>
          </Accordion>
        </div>
      </div>
    </>
  );
}

export default Faq;
