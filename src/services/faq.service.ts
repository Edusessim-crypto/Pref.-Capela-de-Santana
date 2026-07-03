import type { FaqItem } from "@/types";
import data from "@/data/faq-lai.json";

const faqLai = data as FaqItem[];

export async function getFaqLai(): Promise<FaqItem[]> {
  return faqLai;
}
