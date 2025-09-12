import {getTranslations, setRequestLocale} from "next-intl/server";

export default async function Home({params}:{params: Promise<{locale:string}>}) {
  const {locale} = await params;
  setRequestLocale(locale);
  const tBrand = await getTranslations('brand');
  return (
    <div className="space-y-2">
      <h1 className="text-3xl font-bold">{tBrand('title')}</h1>
      <p className="text-muted-foreground">{tBrand('tagline')}</p>
    </div>
  );
}
