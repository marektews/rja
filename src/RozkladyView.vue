<template>
    <div>
        <div class="accordion" id="accordionParent">
            <!-- Na sektorach -->
            <div class="accordion-item">
                <h2 class="accordion-header">
                    <button
                        class="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseOne"
                        aria-expanded="true" 
                        aria-controls="collapseOne"
                    >
                        <FontAwesomeIcon :icon="faBus" class="me-2"/>
                        Na sektorach
                    </button>
                </h2>

                <div 
                    id="collapseOne"
                    class="accordion-collapse collapse show"
                    data-bs-parent="#accordionParent"
                >
                    <div class="accordion-body">
                        <BySectorView />
                    </div>
                </div>
            </div>

            <!-- Wg nazwy zboru -->
            <div class="accordion-item">
                <h2 class="accordion-header">
                    <button
                        class="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseTwo"
                        aria-expanded="false" 
                        aria-controls="collapseTwo"
                    >
                        <FontAwesomeIcon :icon="faSearch" class="me-2"/>
                        Wyszukiwanie po nazwie zboru
                    </button>
                </h2>

                <div 
                    id="collapseTwo"
                    class="accordion-collapse collapse"
                    data-bs-parent="#accordionParent"
                >
                    <div class="accordion-body">
                        <ByCongregationView />
                    </div>
                </div>
            </div>
         </div>
    </div>
</template>

<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faSearch, faBus } from '@fortawesome/free-solid-svg-icons';
import ByCongregationView from './ByCongregationView.vue';
import BySectorView from './BySectorView.vue';

</script>