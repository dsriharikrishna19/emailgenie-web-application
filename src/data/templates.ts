// Re-export all types
export type { EmailCategory, EmailTone, EmailVariable, EmailTemplate } from "./template-types";

// Re-export individual category arrays
export { CAREER_TEMPLATES } from "./career-templates";
export { PROFESSIONAL_TEMPLATES } from "./professional-templates";
export { BUSINESS_TEMPLATES } from "./business-templates";
export { SALES_TEMPLATES } from "./sales-templates";
export { SUPPORT_TEMPLATES } from "./support-templates";
export { PERSONAL_TEMPLATES } from "./personal-templates";
export { UTILITY_TEMPLATES } from "./utility-templates";

// Combined array — used by TemplateGallery
import { CAREER_TEMPLATES } from "./career-templates";
import { PROFESSIONAL_TEMPLATES } from "./professional-templates";
import { BUSINESS_TEMPLATES } from "./business-templates";
import { SALES_TEMPLATES } from "./sales-templates";
import { SUPPORT_TEMPLATES } from "./support-templates";
import { PERSONAL_TEMPLATES } from "./personal-templates";
import { UTILITY_TEMPLATES } from "./utility-templates";

export const EMAIL_TEMPLATES = [
    ...CAREER_TEMPLATES,
    ...PROFESSIONAL_TEMPLATES,
    ...BUSINESS_TEMPLATES,
    ...SALES_TEMPLATES,
    ...SUPPORT_TEMPLATES,
    ...PERSONAL_TEMPLATES,
    ...UTILITY_TEMPLATES,
];
