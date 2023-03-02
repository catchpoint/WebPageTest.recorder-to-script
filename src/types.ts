export interface InquirerAnswerTypes {
  files: string[];
  outputPath: string;
}

export interface Flags {
  dry?: boolean;
  output?: string;
}

export interface ExportToFile {
  stringifiedFile: string;
  testName: string;
  outputPath: string;
  outputFolder: string;
}
