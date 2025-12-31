import ModelPageLayout from "@/components/ModelPageLayout";
import { femaleFashionModels } from "@/lib/models-data";

export default function FemaleFashionPage() {
    return (
        <ModelPageLayout
            title="Female Models"
            category="female"
            subcategory="fashion"
            models={femaleFashionModels}
        />
    );
}
