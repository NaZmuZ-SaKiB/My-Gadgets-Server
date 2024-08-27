import { Types } from 'mongoose';

export type TMedia = {
  name: string;
  publicId: string;
  height: number;
  width: number;
  format: string;
  url: string;
  secureUrl: string;
  thumbnailUrl: string;

  createdAt: string;
  updatedAt: string;
  updatedBy: Types.ObjectId;
};

const media = {
  id: 'uw-file3',
  batchId: 'uw-batch2',
  asset_id: 'd7dbf875a9e7f5371b8afea2a3e9f417',
  public_id: 'My_Gadgets/hl4lmapmdx4mnnqdaa7l',
  version: 1724769204,
  version_id: '121197477001fd8559561d4badc52a28',
  signature: '48ae825e0fbbe42ea8683a22a2945f0fbdc0fa54',
  width: 2016,
  height: 1512,
  format: 'jpg',
  resource_type: 'image',
  created_at: '2024-08-27T14:33:24Z',
  tags: [],
  bytes: 310221,
  type: 'upload',
  etag: '02f92145310c26c30d724288aa4dd42a',
  placeholder: false,
  url: 'http://res.cloudinary.com/dx9putz82/image/upload/v1724769204/My_Gadgets/hl4lmapmdx4mnnqdaa7l.jpg',
  secure_url:
    'https://res.cloudinary.com/dx9putz82/image/upload/v1724769204/My_Gadgets/hl4lmapmdx4mnnqdaa7l.jpg',
  asset_folder: 'My_Gadgets',
  display_name: 'hl4lmapmdx4mnnqdaa7l',
  original_filename: '450003893_999449624825286_311477511985822757_n',
  api_key: '643599385637236',
  path: 'v1724769204/My_Gadgets/hl4lmapmdx4mnnqdaa7l.jpg',
  thumbnail_url:
    'https://res.cloudinary.com/dx9putz82/image/upload/c_limit,h_60,w_90/v1724769204/My_Gadgets/hl4lmapmdx4mnnqdaa7l.jpg',
};
