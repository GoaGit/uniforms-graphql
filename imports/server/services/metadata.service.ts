import { ContentType } from '../../both/enums/content-type';
import { URL } from 'url';
import isAbsoluteUrl from 'is-absolute-url';
import urlMetadata from 'url-metadata';

export class MetadataService {
    /**
     * Case distinction that decides which metadata function to call.
     * Returns nothing if the content type is not Link or Youtbe
     *
     * @param {ContentType} type
     * @param {string} url
     * @returns {(Promise<any>)}
     * @memberof MetadataService
     */
    public async findMetadataForType(type: ContentType, url: string): Promise<any> {
        switch (type) {
            case ContentType.LINK:
                return this.findLinkMetadata(url);
            default:
                return undefined;
        }
    }

    /**
     * Collects the metadata for a thread of the content type link
     *
     * @param {string} url
     * @returns {(Promise<any>)}
     * @memberof MetadataService
     */
    public async findLinkMetadata(url: string): Promise<any> {
        try {
            const result = await urlMetadata(url);

            Object.keys(result).forEach(key => {
                if (!result[key]) {
                    result[key] = null;
                }
            });

            return {
                url,
                title: result['og:title'] ?? result.title ?? null,
                image: this.createAbsoluteUrl(url, result['og:image'] ?? result.image ?? null),
                description: result['og:description'] ?? result.description ?? null,
            };
        } catch (error) {
            console.warn(error);
            return undefined; // ignore an error, as its a non-critical feature
        }
    }

    /**
     * Creates an full URL.
     *
     * @param {string} baseUrl
     * @param {string} newUrl
     * @returns {string}
     * @memberof MetadataService
     */
    public createAbsoluteUrl(baseUrl: string, newUrl: string): string {
        if (!newUrl || isAbsoluteUrl(newUrl)) {
            return newUrl;
        }

        const urlObject = new URL(newUrl, baseUrl);

        return urlObject.href;
    }
}
