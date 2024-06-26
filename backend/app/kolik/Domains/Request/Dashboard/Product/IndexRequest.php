<?php

declare(strict_types=1);

namespace App\kolik\Domains\Request\Dashboard\Product;

use App\Http\Requests\Request as FormRequest;
use App\kolik\Domains\Core\DTO\Dashboard\Product\IndexRequestDTO;
use App\Models\CarModel;
use App\Models\Category;
use App\Models\Manufacturer;
use App\Models\ModelGeneration;
use Illuminate\Validation\Rules\Exists;

/**
 * @OA\Schema(
 *     schema="DashboardProductIndexRequest",
 *
 *      @OA\Property(
 *           property="category_id",
 *           type="integer",
 *           example="1"
 *      ),
 *      @OA\Property(
 *           property="manufacturer_id",
 *           type="integer",
 *           example="3"
 *      ),
 *      @OA\Property(
 *           property="model_id",
 *           type="integer",
 *           example="2"
 *      ),
 *      @OA\Property(
 *           property="generation_id",
 *           type="integer",
 *           example="1"
 *      ),
 *      @OA\Property(
 *           property="name",
 *           type="string",
 *           example="Lobovoe steklo"
 *      )
 * )
 */
final class IndexRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'category_id' => ['nullable', 'integer', new Exists(Category::class, 'category_id')],
            'manufacturer_id' => ['nullable', 'integer', new Exists(Manufacturer::class, 'manufacturer_id')],
            'model_id' => ['nullable', 'integer', new Exists(CarModel::class, 'model_id')],
            'generation_id' => ['nullable', 'integer', new Exists(ModelGeneration::class, 'generation_id')],
            'name' => ['nullable', 'string'],
        ];
    }

    public function getDto(): IndexRequestDTO
    {
        $category = $this->validated('category_id');
        $manufacturer = $this->validated('manufacturer_id');
        $model = $this->validated('model_id');
        $generation = $this->validated('generation_id');

        return new IndexRequestDTO(
            $category !== null ? (int) $category : null,
            $manufacturer !== null ? (int) $manufacturer : null,
            $model !== null ? (int) $model : null,
            $generation !== null ? (int) $generation : null,
            $this->validated('name')
        );
    }
}
