import PageOne, { metadata } from "@/generated/Pageb2209ae1d8";
import PageTwo from "@/generated/Page26cd9913ac";
export { metadata };
export default async function Page({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
const params = await searchParams;
return params.a472e93b_page === "2" ? <PageTwo /> : <PageOne />;
}
