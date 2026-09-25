// Field
import customFieldAdresse from "./field/custom-field-adresse.ts";
import customFieldBooleanData from "./field/custom-field-boolean-data.ts";
import customFieldBooleanText from "./field/custom-field-boolean-text.ts";
import customFieldCountData from "./field/custom-field-count-data.ts";
import customFieldData from "./field/custom-field-data.ts";
import customFieldKode from "./field/custom-field-kode.ts";
import customFieldKommunensSaksnummer from "./field/custom-field-kommunens-saksnummer.ts";
import customFieldListData from "./field/custom-field-list-data.ts";
import customFieldPartNavn from "./field/custom-field-part-navn.ts";
import customFieldProsjekt from "./field/custom-field-prosjekt.ts";
import customFieldTelefonnummer from "./field/custom-field-telefonnummer.ts";
import customFieldUtfallSvarStatus from "./field/custom-field-utfall-svar-status.ts";

// Typography
import customHeaderText from "./typography/custom-header-text.ts";
import customParagraphText from "./typography/custom-paragraph-text.ts";
import customSubheaderText from "./typography/custom-subheader-text.ts";

// List
import customListData from "./list/custom-list-data.ts";
import customListPlanlagteLoefteinnretninger from "./list/custom-list-planlagte-loefteinnretninger.ts";
import customListVedlegg from "./list/custom-list-vedlegg.ts";

// Description list
import customDescriptionListData from "./description-list/custom-description-list-data.ts";

// Table
import customTableAnsvarsomraade from "./table/custom-table-ansvarsomraade.ts";
import customTableAnsvarsrettAnsvarsomraade from "./table/custom-table-ansvarsrett-ansvarsomraade.ts";
import customTableArbeidsplasser from "./table/custom-table-arbeidsplasser.ts";
import customTableData from "./table/custom-table-data.ts";
import customTableEiendom from "./table/custom-table-eiendom.ts";
import customTableNaboGjenboerEiendom from "./table/custom-table-nabo-gjenboer-eiendom.ts";
import customTableOmraaderisiko from "./table/custom-table-omraaderisiko.ts";
import customTablePart from "./table/custom-table-part.ts";
import customTablePartGjennomfoeringsplan from "./table/custom-table-part-gjennomfoeringsplan.ts";
import customTablePlan from "./table/custom-table-plan.ts";

// Matrix
import customMatrixData from "./matrix/custom-matrix-data.ts";

// Summation
import customSummationArealdisponering from "./summation/custom-summation-arealdisponering.ts";
import customSummationData from "./summation/custom-summation-data.ts";

// Group
import customGroupAdkomst from "./group/custom-group-adkomst.ts";
import customGroupAnsvarsrettErklaeringer from "./group/custom-group-ansvarsrett-erklaeringer.ts";
import customGroupAvloep from "./group/custom-group-avloep.ts";
import customGroupDispensasjonOversikt from "./group/custom-group-dispensasjon-oversikt.ts";
import customGroupEttersending from "./group/custom-group-ettersending.ts";
import customGroupKontrollAnsvarsomraade from "./group/custom-group-kontroll-ansvarsomraade.ts";
import customGroupKontrollErklaeringer from "./group/custom-group-kontroll-erklaeringer.ts";
import customGroupLoefteinnretninger from "./group/custom-group-loefteinnretninger.ts";
import customGroupNaboGjenboerEiendom from "./group/custom-group-nabo-gjenboer-eiendom.ts";
import customGroupOvervann from "./group/custom-group-overvann.ts";
import customGroupRammebetingelserKravTilByggegrunn from "./group/custom-group-rammebetingelser-krav-til-byggegrunn.ts";
import customGroupRammebetingelserTilknytninger from "./group/custom-group-rammebetingelser-tilknytninger.ts";
import customGroupSamsvarAnsvarsomraade from "./group/custom-group-samsvar-ansvarsomraade.ts";
import customGroupSamsvarErklaeringer from "./group/custom-group-samsvar-erklaeringer.ts";
import customGroupSjekklistekrav from "./group/custom-group-sjekklistekrav.ts";
import customGroupSjekklistekravHeaderText from "./group/custom-group-sjekklistekrav-header-text.ts";
import customGroupUtfallSvar from "./group/custom-group-utfall-svar.ts";
import customGroupUtfallSvarType from "./group/custom-group-utfall-svar-type.ts";
import customGroupVannforsyning from "./group/custom-group-vannforsyning.ts";
import customGroupVegtypeTillatelse from "./group/custom-group-vegtype-tillatelse.ts";

// Grouplist
import customGrouplistAnsvarsomraadeType from "./grouplist/custom-grouplist-ansvarsomraade-type.ts";
import customGrouplistEttersending from "./grouplist/custom-grouplist-ettersending.ts";
import customGrouplistNaboGjenboerEiendom from "./grouplist/custom-grouplist-nabo-gjenboer-eiendom.ts";
import customGrouplistSamsvarAnsvarsomraade from "./grouplist/custom-grouplist-samsvar-ansvarsomraade.ts";
import customGrouplistSjekklistekrav from "./grouplist/custom-grouplist-sjekklistekrav.ts";
import customGrouplistUtfallSvar from "./grouplist/custom-grouplist-utfall-svar.ts";
import customGrouplistUtfallSvarType from "./grouplist/custom-grouplist-utfall-svar-type.ts";
import customGrouplistVegtypeTillatelse from "./grouplist/custom-grouplist-vegtype-tillatelse.ts";

// Layout
import customDispensasjon from "./layout/custom-dispensasjon.ts";
import customDispensasjonsvarsel from "./layout/custom-dispensasjonsvarsel.ts";
import customGjennomfoeringsplan from "./layout/custom-gjennomfoeringsplan.ts";
import customGjenpartNabovarsel from "./layout/custom-gjenpart-nabovarsel.ts";

export const field = {
    customFieldAdresse,
    customFieldBooleanData,
    customFieldBooleanText,
    customFieldCountData,
    customFieldData,
    customFieldKode,
    customFieldKommunensSaksnummer,
    customFieldListData,
    customFieldPartNavn,
    customFieldProsjekt,
    customFieldTelefonnummer,
    customFieldUtfallSvarStatus
};

export const typography = {
    customHeaderText,
    customSubheaderText,
    customParagraphText
};

export const list = { customListData, customListPlanlagteLoefteinnretninger, customListVedlegg };

export const descriptionList = { customDescriptionListData };

export const table = {
    customTableAnsvarsomraade,
    customTableAnsvarsrettAnsvarsomraade,
    customTableArbeidsplasser,
    customTableData,
    customTableEiendom,
    customTableNaboGjenboerEiendom,
    customTableOmraaderisiko,
    customTablePart,
    customTablePartGjennomfoeringsplan,
    customTablePlan
};

export const matrix = { customMatrixData };

export const summation = { customSummationArealdisponering, customSummationData };

export const group = {
    customGroupAdkomst,
    customGroupAnsvarsrettErklaeringer,
    customGroupAvloep,
    customGroupDispensasjonOversikt,
    customGroupEttersending,
    customGroupKontrollAnsvarsomraade,
    customGroupKontrollErklaeringer,
    customGroupLoefteinnretninger,
    customGroupNaboGjenboerEiendom,
    customGroupOvervann,
    customGroupRammebetingelserKravTilByggegrunn,
    customGroupRammebetingelserTilknytninger,
    customGroupSamsvarAnsvarsomraade,
    customGroupSamsvarErklaeringer,
    customGroupSjekklistekrav,
    customGroupSjekklistekravHeaderText,
    customGroupUtfallSvar,
    customGroupUtfallSvarType,
    customGroupVannforsyning,
    customGroupVegtypeTillatelse
};

export const grouplist = {
    customGrouplistAnsvarsomraadeType,
    customGrouplistEttersending,
    customGrouplistNaboGjenboerEiendom,
    customGrouplistSamsvarAnsvarsomraade,
    customGrouplistSjekklistekrav,
    customGrouplistUtfallSvarType,
    customGrouplistUtfallSvar,
    customGrouplistVegtypeTillatelse
};

export const layout = { customDispensasjon, customDispensasjonsvarsel, customGjennomfoeringsplan, customGjenpartNabovarsel };

export default {
    typography,
    field,
    list,
    descriptionList,
    table,
    matrix,
    summation,
    group,
    grouplist,
    layout
};
