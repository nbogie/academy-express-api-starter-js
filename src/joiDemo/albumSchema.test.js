import { expect, test } from "vitest";
import { albumSchema } from "./setupARouteHandlerDemonstratingValidationWithJoi.js";
test("validates ok when album is correct", () => {
    const submittedData = {
        title: "Slowhand",
        artist: "Eric Clapton",
        year: 1977,
    };
    expect(albumSchema.validate(submittedData).error).toBeUndefined;
});

test("fails validation when album has unexpected extra field", () => {
    const submittedData = {
        title: "Slowhand",
        artist: "Eric Clapton",
        cheekyExtraField: "can this field get through the validation?",
        year: 1977,
    };
    expect(albumSchema.validate(submittedData).value).toBeUndefined;
    expect(albumSchema.validate(submittedData).error.message).toBe(
        `"cheekyExtraField" is not allowed`
    );
});

test("fails validation when album artist is not a string but an object", () => {
    const submittedData = {
        title: "Slowhand",
        artist: { firstName: "Eric", secondName: "Clapton" },
        year: 1977,
    };
    expect(albumSchema.validate(submittedData).value).toBeUndefined;
    expect(albumSchema.validate(submittedData).error.message).toBe(
        `"artist" must be a string`
    );
});

test("fails validation when album is undefined", () => {
    expect(albumSchema.validate(undefined).value).toBeUndefined;
});
test("fails validation when album is empty object", () => {
    expect(albumSchema.validate({}).value).toBeUndefined;
});
