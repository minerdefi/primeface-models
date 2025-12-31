import ModelPageLayout from "@/components/ModelPageLayout";
import { femaleCommercialModels } from "@/lib/models-data";

export default function FemaleCommercialPage() {
    return (
        <ModelPageLayout
            title="Female Models"
            category="female"
            subcategory="commercial"
            models={femaleCommercialModels}
        />
    );
}
