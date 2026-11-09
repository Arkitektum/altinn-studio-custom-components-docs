import type { ComponentExample, ComponentMarkup } from "../../types.ts";

const markup = {
    id: "custom-endring-av-rolle-i-byggesaken",
    type: "Custom",
    tagName: "custom-endring-av-rolle-i-byggesaken",
    dataModelBindings: {
        eiendomByggested: "customLayout.endringAvRolleIByggesaken.eiendomByggested",
        endringMeldtAv: "customLayout.endringAvRolleIByggesaken.endringMeldtAv",
        gjelderFraDato: "customLayout.endringAvRolleIByggesaken.gjelderFraDato",
        kommunensSaksnummer: "customLayout.endringAvRolleIByggesaken.kommunensSaksnummer",
        rolleendringer: "customLayout.endringAvRolleIByggesaken.rolleendringer",
        soeknadGjelder: "customLayout.endringAvRolleIByggesaken.soeknadGjelder"
    }
} satisfies ComponentMarkup;

const defaultResourceBindings = {
    endringAvRolleIByggesaken: {
        title: "resource.endringAvRolleIByggesaken.title"
    },
    kommunensSaksnummer: {
        title: "resource.kommunensSaksnummer.title"
    },
    gjelderFraDato: {
        title: "resource.endringAvRolleIByggesaken.gjelderFraDato.title"
    },
    soeknadGjelderHeader: {
        title: "resource.soeknadGjelder.title"
    },
    eiendomByggested: {
        title: "resource.eiendomByggested.eiendom.title"
    },
    adresse: {
        title: "resource.adresse.title",
        emptyFieldText: "resource.emptyFieldText.address"
    },
    eiendomsidentifikasjonGaardsnummer: {
        title: "resource.eiendom.gaardsnummer.title",
        emptyFieldText: "resource.emptyFieldText.default"
    },
    eiendomsidentifikasjonBruksnummer: {
        title: "resource.eiendom.bruksnummer.title",
        emptyFieldText: "resource.emptyFieldText.default"
    },
    eiendomsidentifikasjonSeksjonsnummer: {
        title: "resource.eiendom.seksjonsnummer.title",
        emptyFieldText: "resource.emptyFieldText.default"
    },
    eiendomsidentifikasjonFestenummer: {
        title: "resource.eiendom.festenummer.title",
        emptyFieldText: "resource.emptyFieldText.default"
    },
    bolignummer: {
        title: "resource.eiendom.bolignummer.title",
        emptyFieldText: "resource.emptyFieldText.default"
    },
    bygningsnummer: {
        title: "resource.eiendom.bygningsnummer.title",
        emptyFieldText: "resource.emptyFieldText.default"
    },
    soeknadGjelderType: {
        title: "resource.soeknadGjelder.type.kode.kodebeskrivelse",
        emptyFieldText: "resource.emptyFieldText.default"
    },
    soeknadGjelderBrukTiltaksformaal: {
        title: "resource.soeknadGjelder.bruk.tiltaksformaal.kode.kodebeskrivelse",
        emptyFieldText: "resource.emptyFieldText.default"
    },
    rolleendringer: {
        title: "resource.rolleendringer.title"
    },
    rolleendringAktoertype: {
        title: "resource.rolleendringer.rolleendring.aktoertype.title",
        emptyFieldText: "resource.emptyFieldText.default"
    },
    rolleendringAktoerendring: {
        title: "resource.rolleendringer.rolleendring.aktoerendring.title",
        emptyFieldText: "resource.emptyFieldText.default"
    },
    rolleendringAktoerNavn: {
        title: "resource.navn.title",
        emptyFieldText: "resource.emptyFieldText.default"
    },
    rolleendringAktoerOrganisasjonsnummer: {
        title: "resource.organisasjonsnummer.title",
        emptyFieldText: "resource.emptyFieldText.default"
    },
    rolleendringErRolleendringErklaert: {
        title: "resource.rolleendringer.rolleendring.erRolleendringErklaert.title",
        trueText: "resource.trueText.default",
        falseText: "resource.falseText.default"
    },
    endringMeldtAv: {
        title: "resource.endringMeldtAv.title"
    },
    endringMeldtAvNavn: {
        title: "resource.navn.title",
        emptyFieldText: "resource.emptyFieldText.default"
    },
    endringMeldtAvTelefonnummer: {
        title: "resource.telefonnummer.title",
        emptyFieldText: "resource.emptyFieldText.default"
    },
    endringMeldtAvEpost: {
        title: "resource.epostadresse.title",
        emptyFieldText: "resource.emptyFieldText.default"
    },
    endringMeldtAvAdresse: {
        title: "resource.adresse.title"
    },
    endringMeldtAvKontaktperson: {
        title: "resource.kontaktperson.title"
    },
    endringMeldtAvKontaktpersonNavn: {
        title: "resource.navn.title",
        emptyFieldText: "resource.emptyFieldText.default"
    },
    endringMeldtAvKontaktpersonTelefonnummer: {
        title: "resource.telefonnummer.title",
        emptyFieldText: "resource.emptyFieldText.default"
    },
    endringMeldtAvKontaktpersonEpost: {
        title: "resource.epostadresse.title",
        emptyFieldText: "resource.emptyFieldText.default"
    }
};

export default { markup, defaultResourceBindings } satisfies ComponentExample;
