import {getTranslations, setRequestLocale} from "next-intl/server";

export default async function Home({params}:{params: Promise<{locale:string}>}) {
  const {locale} = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home");
  return (
    <div className="space-y-2">
      <h1 className="text-3xl font-bold">{t("title")}</h1>
      <p className="text-muted-foreground">{t("tagline")}</p>
    </div>
  );
}
