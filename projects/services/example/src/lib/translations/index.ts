import { InlineLoader, Translation } from '@jsverse/transloco';

type EntitiesCoreLocale = 'pt-BR' | 'en-US' | 'es-ES';

type TranslationModule = Translation | { default: Translation };

type TranslationImporter = () => Promise<TranslationModule>;

const translationImporters: Record<EntitiesCoreLocale, TranslationImporter> = {
    'pt-BR': () => import('./pt-BR.json'),
    'en-US': () => import('./en-US.json'),
    'es-ES': () => import('./es-ES.json'),
};

const loadTranslation = (lang: EntitiesCoreLocale): Promise<Translation> =>
    translationImporters[lang]().then(module => (module as { default?: Translation }).default ?? (module as Translation));

export const entitiesCoreTranslationLoader: InlineLoader = Object.fromEntries(
    (Object.keys(translationImporters) as EntitiesCoreLocale[]).map(lang => [lang, () => loadTranslation(lang)])
) as InlineLoader;
